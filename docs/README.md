## Contents
- [Views](#views)
    - [Introduction](#introduction)
    - [Nível 1](#nível-1)
        - [Vista Lógica](#vista-lógica)
        - [Vista de Processos](#vista-de-processos)
        - [Vista de Cenários](#vista-de-cenários)
    - [Nível 2](#nível-2)
        - [Vista Lógica](#vista-lógica-1)
        - [Vista de Processos](#vista-de-processos)
        - [Vista de Implementação](#vista-de-implementação)
        - [Vista Física](#vista-física)
    - [Nível 3](#nível-3)
        - [Vista Lógica](#vista-lógica-2)
        - [Vista de Processos](#vista-de-processos-1)
        - [Vista de Implementação](#vista-de-implementação-1)

## Introduction
Será adotada a combinação de dois modelos de representação arquitetural: C4 e 4+1.

O Modelo de Vistas 4+1 [[Krutchen-1995]](References.md#Kruchten-1995) propõe a descrição do sistema através de vistas complementares permitindo assim analisar separadamente os requisitos dos vários stakeholders do software, tais como utilizadores, administradores de sistemas, project managers, arquitetos e programadores. As vistas são deste modo definidas da seguinte forma:

- Vista lógica: relativa aos aspetos do software visando responder aos desafios do negócio;
- Vista de processos: relativa ao fluxo de processos ou interações no sistema;
- Vista de desenvolvimento: relativa à organização do software no seu ambiente de desenvolvimento;
- Vista física: relativa ao mapeamento dos vários componentes do software em hardware, i.e. onde é executado o software;
- Vista de cenários: relativa à associação de processos de negócio com atores capazes de os espoletar.

O Modelo C4 [[Brown-2020]](References.md#Brown-2020)[[C4-2020]](References.md#C4-2020) defende a descrição do software através de quatro níveis de abstração: sistema, contentor, componente e código. Cada nível adota uma granularidade mais fina que o nível que o antecede, dando assim acesso a mais detalhe de uma parte mais pequena do sistema. Estes níveis podem ser equiparáveis a mapas, e.g. a vista de sistema corresponde ao globo, a vista de contentor corresponde ao mapa de cada continente, a vista de componentes ao mapa de cada país e a vista de código ao mapa de estradas e bairros de cada cidade.
Diferentes níveis permitem contar histórias diferentes a audiências distintas.

Os níveis encontram-se definidos da seguinte forma:
- Nível 1: Descrição (enquadramento) do sistema como um todo;
- Nível 2: Descrição de contentores do sistema;
- Nível 3: Descrição de componentes dos contentores;
- Nível 4: Descrição do código ou partes mais pequenas dos componentes (e como tal, não será abordado neste DAS/SAD).

Pode-se dizer que estes dois modelos se expandem ao longo de eixos distintos, sendo que o Modelo C4 apresenta o sistema com diferentes níveis de detalhe e o Modelo de Vista 4+1 apresenta o sistema de diferentes perspetivas. Ao combinar os dois modelos torna-se possível representar o sistema de diversas perspetivas, cada uma com vários níveis de detalhe.

Para modelar/representar visualmente, tanto o que foi implementado como as ideias e alternativas consideradas, recorre-se à Unified Modeling Language (UML) [[UML-2020]](References.md#UML-2020) [[UMLDiagrams-2020]](References.md#UMLDiagrams-2020).

## Views:

## Nível 1
### Vista Lógica

![Nivel1-VL](1211171/global/N1-VL.png)

### Vista de Processos

#### SSD US150
![Nivel2-VP](1210816/us150/SSD-US150.svg)
#### SSD US160
![Nivel2-VP](1210816/us160/SSD-US160.svg)
#### SSD US170
![Nivel2-VP](1210816/us170/SSD-US170.svg)
#### SSD US180
![Nivel2-VP](1210816/us180/SSD-US180.svg)
#### SSD US190
![Nivel2-VP](1210816/us190/SSD-US190.svg)
#### SSD US200
![Nivel2-VP](1210816/us200/SSD-US200.svg)
#### SSD US210
![Nivel2-VP](1210816/us210/SSD-US210.svg)
#### SSD US220
![Nivel2-VP](1210816/us220/SSD-US220.svg)
#### SSD US230
![Nivel2-VP](1211171/us230/SSD-US230.svg)
#### SSD US240
![Nivel2-VP](1211171/us240/SSD-US240.svg)
#### SSD US250
![Nivel2-VP](1211171/us250/SSD-US250.svg)
#### SSD US260
![Nivel2-VP](1211171/us260/SSD-US260.svg)
#### SSD US270
![Nivel2-VP](1211171/us270/SSD-US270.svg)
#### SSD US310
![Nivel2-VP](1211171/us310/SSD-US310.svg)

### Vista de Cenários

![Nivel1-VC](1211171/global/N1-VC.png)

## Nível 2
### Vista Lógica

![Nivel2-VL](1211171/global/N2-VL.png)

### Vista de Processos

#### SSD US150 (N2)
![Nivel2-VP](1210816/us150/SSD-N2-US150.svg)
#### SSD US160 (N2)
![Nivel2-VP](1210816/us160/SSD-N2-US160.svg)
#### SSD US170 (N2)
![Nivel2-VP](1210816/us170/SSD-N2-US170.svg)
#### SSD US180 (N2)
![Nivel2-VP](1210816/us180/SSD-N2-US180.svg)
#### SSD US190 (N2)
![Nivel2-VP](1210816/us190/SSD-N2-US190.svg)
#### SSD US200 (N2)
![Nivel2-VP](1210816/us200/SSD-N2-US200.svg)
#### SSD US210 (N2)
![Nivel2-VP](1210816/us210/SSD-N2-US210.svg)
#### SSD US220 (N2)
![Nivel2-VP](1210816/us220/SSD-N2-US220.svg)
#### SSD US230 (N2)
![Nivel2-VP](1211171/us230/SSD-N2-US230.svg)
#### SSD US240 (N2)
![Nivel2-VP](1211171/us240/SSD-N2-US240.svg)
#### SSD US250 (N2)
![Nivel2-VP](1211171/us250/SSD-N2-US250.svg)
#### SSD US260 (N2)
![Nivel2-VP](1211171/us260/SSD-N2-US260.svg)
#### SSD US270 (N2)
![Nivel2-VP](1211171/us270/SSD-N2-US270.svg)
#### SSD US310 (N2)
![Nivel2-VP](1211171/us310/SSD-N2-US310.svg)

### Vista de Implementação
![Nivel2-VI](1211171/global/N2-VI.png)

### Vista Física
![N2-VL](1211171/global/N2-VF.png)

## Nível 3 (MDR)

### Vista Lógica

![Nivel3-VL](1211171/global/N3-VL.png)

### Vista de Processos

#### SD US150
![Nivel3-VP](1210816/us150/SD-N3-US150.svg)
#### SD US160
![Nivel3-VP](1210816/us160/SD-N3-US160.svg)
#### SD US170
![Nivel3-VP](1210816/us170/SD-N3-US170.svg)
#### SD US180
![Nivel3-VP](1210816/us180/SD-N3-US180.svg)
#### SD US190
![Nivel3-VP](1210816/us190/SD-N3-US190.svg)
#### SD US200
![Nivel3-VP](1210816/us200/SD-N3-US200.svg)
#### SD US210
![Nivel3-VP](1210816/us210/SD-N3-US210.svg)
#### SD US220
![Nivel3-VP](1210816/us220/SD-N3-US220.svg)
#### SD US230
![Nivel3-VP](1211171/us230/SD-N3-US230.svg)
#### SD US240
![Nivel3-VP](1211171/us240/SD-N3-US240.svg)
#### SD US250
![Nivel3-VP](1211171/us250/SD-N3-US250.svg)
#### SD US260
![Nivel3-VP](1211171/us260/SD-N3-US260.svg)
#### SD US270
![Nivel3-VP](1211171/us270/SD-N3-US270.svg)
#### SD US310
![Nivel3-VP](1211171/us310/SD-N3-US310.svg)

### Vista de Implementação
![Nivel3-VI](1211171/global/N3-VI.png)