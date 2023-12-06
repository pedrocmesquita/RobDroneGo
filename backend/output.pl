:- set_prolog_flag(answer_write_options,[max_depth(0)]).
:- set_prolog_flag(stack_limit,17_179_869_184). %next size stack 17_179_869_184

:- dynamic ligacel/2.
:- dynamic ligacao_piso/3.
:- dynamic ligacao_edificio/2.

:- discontiguous m/5.
:- discontiguous ligacao_edificio/2.
:- discontiguous ligacao_piso/2.
:- discontiguous ligacao_piso/3.

% Função para criar os grafos de um piso específico

cria_grafo(Edificio, Piso, _, 0) :- !.
cria_grafo(Edificio, Piso, Col, Lin) :-
    cria_grafo_lin(Edificio, Piso, Col, Lin),
    Lin1 is Lin - 1,
    cria_grafo(Edificio, Piso, Col, Lin1).

cria_grafo_lin(_, _, 0, _) :- !.
cria_grafo_lin(Edificio, Piso, Col, Lin) :-
    m(Edificio, Piso, Col, Lin, 0), !,
    ColS is Col + 1, ColA is Col - 1, LinS is Lin + 1, LinA is Lin - 1,
    cria_ligacoes(Edificio, Piso, Col, Lin, ColS, ColA, LinS, LinA),
    Col1 is Col - 1,
    cria_grafo_lin(Edificio, Piso, Col1, Lin).

cria_grafo_lin(Edificio, Piso, Col, Lin) :-
    Col1 is Col - 1,
    cria_grafo_lin(Edificio, Piso, Col1, Lin).

% Função auxiliar para criar ligações entre células adjacentes
cria_ligacoes(Edificio, Piso, Col, Lin, ColS, ColA, LinS, LinA) :-
    ((m(Edificio, Piso, ColS, Lin, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, ColS, Lin))); true)),
    ((m(Edificio, Piso, ColA, Lin, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, ColA, Lin))); true)),
    ((m(Edificio, Piso, Col, LinS, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, Col, LinS))); true)),
    ((m(Edificio, Piso, Col, LinA, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, Col, LinA))); true)),
    % Ligações diagonais
    ((m(Edificio, Piso, ColS, LinS, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, ColS, LinS))); true)),
    ((m(Edificio, Piso, ColS, LinA, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, ColS, LinA))); true)),
    ((m(Edificio, Piso, ColA, LinS, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, ColA, LinS))); true)),
    ((m(Edificio, Piso, ColA, LinA, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, ColA, LinA))); true)).

% Extensão do ligacel para lidar com ligações entre pisos e edifícios
ligacel(Cel1, Cel2) :-
    ligacel_piso(Cel1, Cel2);  % Verifica se existe ligação direta
    ligacel_piso(Cel2, Cel1);  % Verifica se a ligação é bidirecional
    ligacao_piso(_, Cel1, Cel2);  % Verifica ligações entre pisos
    ligacao_piso(_, Cel2, Cel1);  % Verifica se a ligação entre pisos é bidirecional
    ligacao_edificio(Cel1, Cel2);  % Verifica ligações entre edifícios
    ligacao_edificio(Cel2, Cel1).  % Verifica se a ligação entre edifícios é bidirecional

ligacel_piso(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, Col, LinS)) :-
    m(Edificio, Piso, Col, Lin, 0),
    m(Edificio, Piso, Col, LinS, 0),
    LinS is Lin + 1.

ligacel_piso(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, ColS, Lin)) :-
    m(Edificio, Piso, Col, Lin, 0),
    m(Edificio, Piso, ColS, Lin, 0),
    ColS is Col + 1.
m(B,B-1,0,0,1).
m(B,B-1,0,10,1).
m(B,B-1,1,0,1).
m(B,B-1,1,10,1).
m(B,B-1,2,0,1).
m(B,B-1,2,10,1).
m(B,B-1,3,0,1).
m(B,B-1,3,10,1).
m(B,B-1,4,0,1).
m(B,B-1,4,10,1).
m(B,B-1,5,0,1).
m(B,B-1,5,10,1).
m(B,B-1,6,0,1).
m(B,B-1,6,10,1).
m(B,B-1,7,0,1).
m(B,B-1,7,10,1).
m(B,B-1,8,0,1).
m(B,B-1,8,10,1).
m(B,B-1,9,0,1).
m(B,B-1,9,10,1).
m(B,B-1,0,0,1).
m(B,B-1,10,0,1).
m(B,B-1,0,1,1).
m(B,B-1,10,1,1).
m(B,B-1,0,2,1).
m(B,B-1,10,2,1).
m(B,B-1,0,3,1).
m(B,B-1,10,3,1).
m(B,B-1,0,4,1).
m(B,B-1,10,4,1).
m(B,B-1,0,5,1).
m(B,B-1,10,5,1).
m(B,B-1,0,6,1).
m(B,B-1,10,6,1).
m(B,B-1,0,7,1).
m(B,B-1,10,7,1).
m(B,B-1,0,8,1).
m(B,B-1,10,8,1).
m(B,B-1,0,9,1).
m(B,B-1,10,9,1).
m(B,B-1,1,4,1).
m(B,B-1,1,0,1).
m(B,B-1,2,4,1).
m(B,B-1,2,0,1).
m(B,B-1,3,4,1).
m(B,B-1,3,0,1).
m(B,B-1,4,4,1).
m(B,B-1,4,0,1).
m(B,B-1,4,0,1).
m(B,B-1,1,0,1).
m(B,B-1,4,1,1).
m(B,B-1,1,1,1).
m(B,B-1,4,2,1).
m(B,B-1,1,2,1).
m(B,B-1,4,3,1).
m(B,B-1,1,3,1).
m(B,B-1,4,4,0).
m(B,B-1,2,1,0).
m(B,B-1,2,2,0).
m(B,B-1,2,3,0).
m(B,B-1,3,1,0).
m(B,B-1,3,2,0).
m(B,B-1,3,3,0).
m(B,B-1,0,0,0).
m(B,B-1,0,1,0).
m(B,B-1,0,2,0).
m(B,B-1,0,3,0).
m(B,B-1,0,4,0).
m(B,B-1,0,5,0).
m(B,B-1,0,6,0).
m(B,B-1,0,7,0).
m(B,B-1,0,8,0).
m(B,B-1,0,9,0).
m(B,B-1,1,5,0).
m(B,B-1,1,6,0).
m(B,B-1,1,7,0).
m(B,B-1,1,8,0).
m(B,B-1,1,9,0).
m(B,B-1,2,5,0).
m(B,B-1,2,6,0).
m(B,B-1,2,7,0).
m(B,B-1,2,8,0).
m(B,B-1,2,9,0).
m(B,B-1,3,5,0).
m(B,B-1,3,6,0).
m(B,B-1,3,7,0).
m(B,B-1,3,8,0).
m(B,B-1,3,9,0).
m(B,B-1,4,5,0).
m(B,B-1,4,6,0).
m(B,B-1,4,7,0).
m(B,B-1,4,8,0).
m(B,B-1,4,9,0).
m(B,B-1,5,0,0).
m(B,B-1,5,1,0).
m(B,B-1,5,2,0).
m(B,B-1,5,3,0).
m(B,B-1,5,4,0).
m(B,B-1,5,5,0).
m(B,B-1,5,6,0).
m(B,B-1,5,7,0).
m(B,B-1,5,8,0).
m(B,B-1,5,9,0).
m(B,B-1,6,0,0).
m(B,B-1,6,1,0).
m(B,B-1,6,7,0).
m(B,B-1,6,8,0).
m(B,B-1,6,9,0).
m(B,B-1,7,0,0).
m(B,B-1,7,1,0).
m(B,B-1,7,7,0).
m(B,B-1,7,8,0).
m(B,B-1,7,9,0).
m(B,B-1,8,0,0).
m(B,B-1,8,1,0).
m(B,B-1,8,7,0).
m(B,B-1,8,8,0).
m(B,B-1,8,9,0).
m(B,B-1,9,0,0).
m(B,B-1,9,1,0).
m(B,B-1,9,2,0).
m(B,B-1,9,3,0).
m(B,B-1,9,4,0).
m(B,B-1,9,5,0).
m(B,B-1,9,6,0).
m(B,B-1,9,7,0).
m(B,B-1,9,8,0).
m(B,B-1,9,9,0).
m(B,B-1,6,6,1).
m(B,B-1,6,2,1).
m(B,B-1,7,6,1).
m(B,B-1,7,2,1).
m(B,B-1,8,6,1).
m(B,B-1,8,2,1).
m(B,B-1,8,2,1).
m(B,B-1,6,2,1).
m(B,B-1,8,3,1).
m(B,B-1,6,3,1).
m(B,B-1,8,4,1).
m(B,B-1,6,4,1).
m(B,B-1,8,5,1).
m(B,B-1,6,5,1).
m(B,B-1,8,6,1).
m(B,B-1,6,6,1).
m(B,B-1,7,3,0).
m(B,B-1,7,4,0).
m(B,B-1,7,5,0).
m(B,B-1,0,0,0).
m(B,B-1,0,1,0).
m(B,B-1,0,2,0).
m(B,B-1,0,3,0).
m(B,B-1,0,4,0).
m(B,B-1,0,5,0).
m(B,B-1,0,6,0).
m(B,B-1,0,7,0).
m(B,B-1,0,8,0).
m(B,B-1,0,9,0).
m(B,B-1,1,5,0).
m(B,B-1,1,6,0).
m(B,B-1,1,7,0).
m(B,B-1,1,8,0).
m(B,B-1,1,9,0).
m(B,B-1,2,5,0).
m(B,B-1,2,6,0).
m(B,B-1,2,7,0).
m(B,B-1,2,8,0).
m(B,B-1,2,9,0).
m(B,B-1,3,5,0).
m(B,B-1,3,6,0).
m(B,B-1,3,7,0).
m(B,B-1,3,8,0).
m(B,B-1,3,9,0).
m(B,B-1,4,5,0).
m(B,B-1,4,6,0).
m(B,B-1,4,7,0).
m(B,B-1,4,8,0).
m(B,B-1,4,9,0).
m(B,B-1,5,0,0).
m(B,B-1,5,1,0).
m(B,B-1,5,2,0).
m(B,B-1,5,3,0).
m(B,B-1,5,4,0).
m(B,B-1,5,5,0).
m(B,B-1,5,6,0).
m(B,B-1,5,7,0).
m(B,B-1,5,8,0).
m(B,B-1,5,9,0).
m(B,B-1,6,0,0).
m(B,B-1,6,1,0).
m(B,B-1,6,7,0).
m(B,B-1,6,8,0).
m(B,B-1,6,9,0).
m(B,B-1,7,0,0).
m(B,B-1,7,1,0).
m(B,B-1,7,7,0).
m(B,B-1,7,8,0).
m(B,B-1,7,9,0).
m(B,B-1,8,0,0).
m(B,B-1,8,1,0).
m(B,B-1,8,7,0).
m(B,B-1,8,8,0).
m(B,B-1,8,9,0).
m(B,B-1,9,0,0).
m(B,B-1,9,1,0).
m(B,B-1,9,2,0).
m(B,B-1,9,3,0).
m(B,B-1,9,4,0).
m(B,B-1,9,5,0).
m(B,B-1,9,6,0).
m(B,B-1,9,7,0).
m(B,B-1,9,8,0).
m(B,B-1,9,9,0).
ligacao_edificio(cel(B,B-1,1011111111,5), cel(M,M-1,0,5)).
ligacao_piso(B, cel(B, B-1, 10, 2), cel(B, B-1, 10, 2)).
m(B,B-3,0,0,1).
m(B,B-3,0,10,1).
m(B,B-3,1,0,1).
m(B,B-3,1,10,1).
m(B,B-3,2,0,1).
m(B,B-3,2,10,1).
m(B,B-3,3,0,1).
m(B,B-3,3,10,1).
m(B,B-3,4,0,1).
m(B,B-3,4,10,1).
m(B,B-3,5,0,1).
m(B,B-3,5,10,1).
m(B,B-3,6,0,1).
m(B,B-3,6,10,1).
m(B,B-3,7,0,1).
m(B,B-3,7,10,1).
m(B,B-3,8,0,1).
m(B,B-3,8,10,1).
m(B,B-3,9,0,1).
m(B,B-3,9,10,1).
m(B,B-3,0,0,1).
m(B,B-3,10,0,1).
m(B,B-3,0,1,1).
m(B,B-3,10,1,1).
m(B,B-3,0,2,1).
m(B,B-3,10,2,1).
m(B,B-3,0,3,1).
m(B,B-3,10,3,1).
m(B,B-3,0,4,1).
m(B,B-3,10,4,1).
m(B,B-3,0,5,1).
m(B,B-3,10,5,1).
m(B,B-3,0,6,1).
m(B,B-3,10,6,1).
m(B,B-3,0,7,1).
m(B,B-3,10,7,1).
m(B,B-3,0,8,1).
m(B,B-3,10,8,1).
m(B,B-3,0,9,1).
m(B,B-3,10,9,1).
ligacao_edificio(cel(M,M-1,4,3), cel(B,B-3,2,3)).
m(M,M-1,0,0,1).
m(M,M-1,0,10,1).
m(M,M-1,1,0,1).
m(M,M-1,1,10,1).
m(M,M-1,2,0,1).
m(M,M-1,2,10,1).
m(M,M-1,3,0,1).
m(M,M-1,3,10,1).
m(M,M-1,4,0,1).
m(M,M-1,4,10,1).
m(M,M-1,5,0,1).
m(M,M-1,5,10,1).
m(M,M-1,6,0,1).
m(M,M-1,6,10,1).
m(M,M-1,7,0,1).
m(M,M-1,7,10,1).
m(M,M-1,8,0,1).
m(M,M-1,8,10,1).
m(M,M-1,9,0,1).
m(M,M-1,9,10,1).
m(M,M-1,0,0,1).
m(M,M-1,10,0,1).
m(M,M-1,0,1,1).
m(M,M-1,10,1,1).
m(M,M-1,0,2,1).
m(M,M-1,10,2,1).
m(M,M-1,0,3,1).
m(M,M-1,10,3,1).
m(M,M-1,0,4,1).
m(M,M-1,10,4,1).
m(M,M-1,0,5,1).
m(M,M-1,10,5,1).
m(M,M-1,0,6,1).
m(M,M-1,10,6,1).
m(M,M-1,0,7,1).
m(M,M-1,10,7,1).
m(M,M-1,0,8,1).
m(M,M-1,10,8,1).
m(M,M-1,0,9,1).
m(M,M-1,10,9,1).
ligacao_edificio(cel(B,B-1,10,5), cel(M,M-1,0,5)).
ligacao_edificio(cel(M,M-1,4,3), cel(B,B-3,2,3)).
ligacao_piso(M, cel(M, M-1, 1, 1), cel(M, M-1, 1, 1)).
m(Z,Z-7,0,0,1).
m(Z,Z-7,0,10,1).
m(Z,Z-7,1,0,1).
m(Z,Z-7,1,10,1).
m(Z,Z-7,2,0,1).
m(Z,Z-7,2,10,1).
m(Z,Z-7,3,0,1).
m(Z,Z-7,3,10,1).
m(Z,Z-7,4,0,1).
m(Z,Z-7,4,10,1).
m(Z,Z-7,5,0,1).
m(Z,Z-7,5,10,1).
m(Z,Z-7,6,0,1).
m(Z,Z-7,6,10,1).
m(Z,Z-7,7,0,1).
m(Z,Z-7,7,10,1).
m(Z,Z-7,8,0,1).
m(Z,Z-7,8,10,1).
m(Z,Z-7,9,0,1).
m(Z,Z-7,9,10,1).
m(Z,Z-7,0,0,1).
m(Z,Z-7,10,0,1).
m(Z,Z-7,0,1,1).
m(Z,Z-7,10,1,1).
m(Z,Z-7,0,2,1).
m(Z,Z-7,10,2,1).
m(Z,Z-7,0,3,1).
m(Z,Z-7,10,3,1).
m(Z,Z-7,0,4,1).
m(Z,Z-7,10,4,1).
m(Z,Z-7,0,5,1).
m(Z,Z-7,10,5,1).
m(Z,Z-7,0,6,1).
m(Z,Z-7,10,6,1).
m(Z,Z-7,0,7,1).
m(Z,Z-7,10,7,1).
m(Z,Z-7,0,8,1).
m(Z,Z-7,10,8,1).
m(Z,Z-7,0,9,1).
m(Z,Z-7,10,9,1).
% Predicado de inicialização

:- initialization(cria_grafos).

cria_grafos :-
    cria_grafo(c,1,16,10),
    cria_grafo(d,1,17,10),
    cria_grafo(a,1,10,16),
    cria_grafo(B,B-1,9,9),
    cria_grafo(c,2,17,10),
    cria_grafo(d,2,14,10),
    cria_grafo(a,2,9,18),
    cria_grafo(b,2,8,19),
    cria_grafo(c,3,18,9),
    cria_grafo(d,3,14,9),
    cria_grafo(b,3,8,17),
    cria_grafo(c,4,15,9).

aStar(Orig, Dest, Cam, Custo):-
    aStar2(Dest, [(_, 0, [Orig])], [], Cam, Custo).

aStar2(Dest, [(_, Custo, [Dest|T])|_], _, Cam, Custo):-
    reverse([Dest|T], Cam).

aStar2(Dest, [(_, Ca, LA)|Outros], Visitados, Cam, Custo):-
    LA = [Act|_],
    findall((CEX, CaX, [X|LA]),
            (Dest \== Act,
             ligacel(Act, X),
             \+ member(X, Visitados),
             \+ member(X, LA),
             CaX is Ca + 1,  % Cost from start to current node
             heuristic(X, Dest, EstX),  % node to goal estimation
             CEX is CaX + EstX),  % Total cost including heuristic
            Novos),
    append(Outros, Novos, Todos),
    append(Visitados, [Act], VisitadosAtualizados),
    sort(Todos, TodosOrd),
    aStar2(Dest, TodosOrd, VisitadosAtualizados, Cam, Custo).

heuristic(cel(_, _, X1, Y1), cel(_, _, X2, Y2), Estimativa) :-
    Estimativa is abs(X2 - X1) + abs(Y2 - Y1).