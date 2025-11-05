# Jogo de Plataforma Simples com JavaScript e Canvas

Este é um projeto simples de jogo de plataforma 2D desenvolvido inteiramente com **HTML5, CSS3 e JavaScript puro**, utilizando a API **Canvas** para renderização.


## ✨ Funcionalidades

* **Movimentação:** Controle de velocidade e aceleração (física básica).
* **Pulo:** Mecanismo de pulo com força definida.
* **Colisão:** Detecção de colisão retangular (`rectsOverlap`) com múltiplas plataformas.
* **Gravidade e Fricção:** Implementação de física básica para um movimento realista.
* **Design Simples:** Interface minimalista e responsiva.
* **Reiniciar:** Função de reset para o estado inicial do jogador.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura básica do jogo e do canvas.
* **CSS3:** Estilização do fundo (gradiente), interface de usuário e posicionamento do canvas.
* **JavaScript (ES6+):** Lógica do jogo, controle de entrada (event listeners), física, loop de jogo (`requestAnimationFrame`) e renderização no Canvas.

## 🎮 Como Jogar

O jogo é controlado pelo teclado, focado no elemento Canvas.

| Ação | Tecla |
| :--- | :--- |
| Mover para a esquerda | **Seta Esquerda** (←) |
| Mover para a direita | **Seta Direita** (→) |
| Pular | **Seta Cima** (↑) |
| Reiniciar Posição | **R** |

> **Nota:** É necessário clicar no Canvas para focar a entrada do teclado.

## ⚙️ Estrutura do Código (Destaques)

* **`script.js`**:
    * **Loop Principal:** Utiliza `requestAnimationFrame(loop)` para um loop de jogo suave, chamando `update()` e `draw()`.
    * **Física:** As variáveis `gravity` (0.5) e `friction` (0.88) definem o comportamento do movimento.
    * **Colisão:** A função `rectsOverlap(a, b)` lida com toda a lógica de colisão entre o jogador e as plataformas, controlando a posição e a velocidade em X e Y.

* **`style.css`**:
    * O fundo do Canvas utiliza um `linear-gradient(#87CEEB, #66B2FF)` para criar um efeito de céu.
