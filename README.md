# Api de Livros Alura

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Pequena Api criada como parte do curso de NodeJs com Express

---

## Descrição
O objetivo desta API é fazer o cadastro de livros com seus devidos autores e editoras, o sistema deve permitir que o usuário consulte livros por nome, editora, nome de Autor, bem como deve também garantir que os dados sejam armazenados da forma correta.

---

## Aprendizados

Neste curso aprendemos como utilizar o express para controlar nossas rotas tornando mais fácil o direcionamento do cliente, utilizamos também o mongoose para manipular os dados em um banco de dados Atlas MongoDB, além de criar todas as tratativas de erros, deixando os nossos erros muito mais semânticos.

Com o mongoose fizemos toda a tratativa de criação de banco de dados, adição de registros, alteração, recuperação, exclusão, validação dos dados inseridos, recuperação utilizando regex e paginação da recuperação dos registros.

O conteúdo foi bem fácil de ser absorvido, tive algumas dificuldades na hora de utilizar o mongoose, pois a versão que utilizei era superior à utilizada no curso, e a versão anterior dele, utilizava funções de callback, já a nova versão utiliza try/catch com async/await.

Foi utilizado também o NodeMon para que as atualizações fossem prontamente colocadas em funcionamento.

Também aprendemos a utilizar o ESLint para padronizar nossos documentos e corrigir outros erros.

Outra ferramenta útil foi o dotenv, utilizados para criar variáveis de ambiente, para manter os dados sensíveis restritos.
