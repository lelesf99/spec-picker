Relatório do Projeto: Spec-Picker
1. Introdução
O Spec-Picker é um sistema web desenvolvido em Angular, com o objetivo de ajudar usuários a escolher a melhor configuração hipotética de CPU baseada em seus requisitos e orçamento. Ele considera atributos como desempenho de núcleo único, desempenho multinúcleo, caches de diferentes níveis (L1, L2, L3) e eficiência energética (TDP), oferecendo uma solução prática e educativa para facilitar a tomada de decisão.
Este relatório apresenta a lógica implementada, o uso de Inteligência Artificial no desenvolvimento e as decisões técnicas tomadas durante o projeto.

2. Descrição do Sistema
O sistema é composto por uma interface interativa que permite ao usuário:
Definir um orçamento: Selecionando valores mínimo e máximo via slider ou campos numéricos.
Escolher aplicações principais: Como jogar, trabalhar ou estudar, com subcategorias como "Jogos Competitivos" ou "Edição de Vídeos".
Selecionar tipo de uso: Como desktop ou móvel, influenciando atributos como eficiência energética.
Receber recomendações de CPU: O sistema gera especificações hipotéticas com base nos pesos ajustados, incluindo frequência, número de núcleos, caches (L1, L2, L3) e consumo de energia.

3. Estrutura do Código
Componentização
O projeto é baseado no Angular, com foco na simplicidade e modularidade:
AppComponent: Componente principal que gerencia o fluxo de entrada do usuário e calcula as especificações de CPU.
mainForm: Formulário reativo usado para armazenar os dados inseridos pelo usuário.
Pesos e Ajustes: O sistema utiliza pesos base e dinâmicos para calcular as especificações de CPU.
Cálculo de Especificações
A lógica de cálculo baseia-se em:
Pesos Dinâmicos:
Ajustados com base nas escolhas do usuário para diferentes atividades e tipos de uso.
Fórmulas:
A frequência, núcleos, e caches são ajustados proporcionalmente ao orçamento e aos pesos.
Eficiência Energética:
CPUs móveis e desktops ajustam o consumo com base nos requisitos.

4. Uso de Inteligência Artificial
Colaboração com IA
Durante o desenvolvimento, foram utilizados recursos de IA para:
Criação de ideias: Organização das categorias de uso e suas respectivas ponderações.
Refinamento de lógica: Discussões e revisões sobre a melhor forma de implementar o cálculo das especificações.
Sugestões técnicas: Ajustes de pesos e fórmulas de cálculo.
Os prompts utilizados ao longo do desenvolvimento foram iterativos, buscando a solução mais clara e eficiente para o problema proposto.

5. Repositório e Demonstração
O código está disponível no repositório público do GitHub:
Repositório: Spec-Picker
Demonstração: Publicado no GitHub Pages para fácil acesso aqui.
