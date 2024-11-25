## Instruções
Ao clonar o projeto no seu computador, é necessário instalar a pasta node_modules para que o TailwindCSS funcione corretamente.<br>
Siga os passos abaixo:<br>

Abra o terminal no diretório do projeto e execute o seguinte comando:<br>

```npm install -D tailwindcss ``` <br>
Esse comando instalará o TailwindCSS e criará a pasta node_modules.

Em seguida, ainda no terminal, execute:<br>


```npx tailwindcss -i ./src/input.css -o ./src/output.css --watch```<br>
Esse comando iniciará o TailwindCSS em modo de observação, compilando o arquivo input.css para output.css sempre que houver alterações.

