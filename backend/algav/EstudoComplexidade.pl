:- set_prolog_flag(answer_write_options,[max_depth(0)]).
:- set_prolog_flag(stack_limit,8_589_934_592). %next size stack 17_179_869_184

:-dynamic ligacel/2.
:-dynamic m/3.
:-dynamic nlin/1.

cria_matriz:-
retractall(m(_,_,_)),
retractall(ligacel(_,_)),
write('Numero de Colunas: '),read(NCol),nl,
write('Numero de Linhas: '),read(NLin),nl,asserta(nlin(NLin)),
cria_matriz_0(NCol,NLin),cria_grafo(NCol,NLin),retract(nlin(_)).
cria_matriz_0(1,1):-!,asserta(m(1,1,0)).
cria_matriz_0(NCol,1):-!,asserta(m(NCol,1,0)),NCol1 is NCol-1,nlin(NLin),cria_matriz_0(NCol1,NLin).
cria_matriz_0(NCol,NLin):-asserta(m(NCol,NLin,0)),NLin1 is NLin-1,cria_matriz_0(NCol,NLin1).


cria_grafo(_,0):-!.
cria_grafo(Col,Lin):-cria_grafo_lin(Col,Lin),Lin1 is Lin-
1,cria_grafo(Col,Lin1).
cria_grafo_lin(0,_):-!.
cria_grafo_lin(Col,Lin):-m(Col,Lin,0),!,
ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
((m(ColS,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColS,Lin)));true)),
((m(ColA,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColA,Lin)));true)),
((m(Col,LinS,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinS)));true)),
((m(Col,LinA,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinA)));true)),
% Movimentos diagonais
%(m(ColS, LinS, 0), assertz(ligacel(cel(Col, Lin), cel(ColS, LinS))); true),
%(m(ColS, LinA, 0), assertz(ligacel(cel(Col, Lin), cel(ColS, LinA))); true),
%(m(ColA, LinS, 0), assertz(ligacel(cel(Col, Lin), cel(ColA, LinS))); true),
%(m(ColA, LinA, 0), assertz(ligacel(cel(Col, Lin), cel(ColA, LinA))); true),
Col1 is Col-1,
cria_grafo_lin(Col1,Lin).
cria_grafo_lin(Col,Lin):-Col1 is Col-1,cria_grafo_lin(Col1,Lin).

% Predicado dfs com temporizador
dfs_timed(Orig, Dest, Cam, Tempo) :-
    get_time(Ti),        % Inicia o temporizador
    dfs(Orig, Dest, Cam),
    get_time(Tf),        % Finaliza o temporizador
    Tempo is Tf - Ti.    % Calcula o tempo total

dfs(Orig,Dest,Cam):-
dfs2(Orig,Dest,[Orig],Cam).
dfs2(Dest,Dest,LA,Cam):-
reverse(LA,Cam).
dfs2(Act,Dest,LA,Cam):-ligacel(Act,X),\+ member(X,LA),
dfs2(X,Dest,[X|LA],Cam).
all_dfs(Orig,Dest,LCam):-findall(Cam,dfs(Orig,Dest,Cam),LCam).

better_dfs(Orig,Dest,Cam):-all_dfs(Orig,Dest,LCam), shortlist(LCam,Cam,_).
shortlist([L],L,N):-!,length(L,N).
shortlist([L|LL],Lm,Nm):-shortlist(LL,Lm1,Nm1),
length(L,NL),
((NL<Nm1,!,Lm=L,Nm is NL);(Lm=Lm1,Nm is Nm1)).

% Predicado bfs com temporizador
bfs_timed(Orig, Dest, Cam, Tempo) :-
    get_time(Ti),       % Inicia o temporizador
    bfs(Orig, Dest, Cam),
    get_time(Tf),       % Finaliza o temporizador
    Tempo is Tf - Ti.   % Calcula o tempo total

bfs(Orig,Dest,Cam) :- bfs2(Dest,[[Orig]],Cam).

bfs2(Dest,[[Dest|T]|_],Cam):-
    reverse([Dest|T],Cam).

bfs2(Dest,[LA|Outros],Cam):-
    LA=[Act|_],
    findall([X|LA],
    (Dest\==Act,ligacel(Act,X),\+ member(X,LA)),
    Novos),
    append(Outros,Novos,Todos),
    bfs2(Dest,Todos,Cam).


aStar_timed(Orig, Dest, Cam, Custo, Tempo) :-
    get_time(Ti),
    aStar(Orig, Dest, Cam, Custo),
    get_time(Tf),
    Tempo is Tf - Ti.

aStar(Orig, Dest, Cam, Custo) :-
    aStar2(Dest, [(0, 0, Orig, [Orig])], Cam, Custo).

aStar2(Dest, [(Custo, _, Dest, [Dest | T]) | _], Cam, Custo) :-
    reverse([Dest | T], Cam).

aStar2(Dest, [(Ca, CustoAtual, Act, LA) | Outros], Cam, Custo) :-
    LA = [Act | _],
    findall((CEX, CaX, X, [X | LA]),
        (Dest \== Act, ligacel(Act, X), \+ member(X, LA),
        CustoX is 1,  % Update this to the appropriate cost for moving from Act to X
        CaX is CustoX + Ca,
        estimativa(X, Dest, EstX),
        CEX is CaX + EstX),
        Novos),
    append(Outros, Novos, Todos),
    sort(Todos, TodosOrd),
    aStar2(Dest, TodosOrd, Cam, Custo).


% Euclidean distance estimation between cells
estimativa(cel(X1, Y1), cel(X2, Y2), Estimativa) :-
    Estimativa is sqrt((X1 - X2)^2 + (Y1 - Y2)^2).



