Você pode gerenciar melhor os containers docker instalando o docker desktop.
Abra o terminal do computador.
execute os comandos:
cd C:\Users\julio\ProgWeb2PostServer

(onde está o caminho C:\Users\julio\ProgWeb2PostServer mude para o local onde está a pasta ProgWeb2PostServer no seu computador)

docker build -t progweb2 .
docker run -p 3000:3000 progweb2

(abra o navegador da internet e confira que os endereços estão em funcionamento:
http://localhost:3000/api/posts
http://localhost:3000/api/users
http://localhost:3000/api/messages)

feche e abra o terminal novamente.
abra o docker desktop e escolha as opções de parar o conteiner, caso deseje parar a execução do container, e excluir conteiner, caso
deseje excluir o conteiner. Caso deseje excluir o conteiner, lembre-se de excluir a imagem e a build, caso elas ainda estejam no docker.


