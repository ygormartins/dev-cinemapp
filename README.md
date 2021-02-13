## APP do desafio técnico: CinemApp

Como proposto pelo desafio, elaborei um App, utilizando a ferramenta React Native, que lista filmes e séries diretamente do banco de dados da IMDb usando a API OMDb. Além disso, o App permite a procura e adição dos resultados à lista de favoritos do usuário, bem como a opção de ver e excluir favoritos.

![Logo do App](https://i.imgur.com/L40Jj1G.png)
### Informações gerais:
* Nome: CinemApp
* Desenvolvido em: React Native
* Tamanho: 25.84MB (android)
* Plataforma(s): Android, iOS, Web
### Instalação no Android:
Para instalar o App em dispositivos Android, basta executar o arquivo `release.apk`, localizado na pasta `releases/android/`. Talvez seja necessário habilitar a instalação por outras fontes nas configurações, este processo varia de cada dispositivo.

### Requisitos:
Para executar o código, os seguintes componentes serão necessários:
Windows |
------------ |
Plataforma Node.js |
Framework React Native |
Ferramenta Watchman (execução em tempo-real) |
Ambiente de Desenvolvimento Java (JDK) |
Seu editor favorito |
Android Studio + SDK (Android) |

MacOS |
------------ |
Plataforma Node.js |
Framework React Native |
Ambiente de Desenvolvimento Java (JDK) |
Ferramenta Watchman (execução em tempo-real) |
Seu editor favorito |
Xcode (iOS) |
Android Studio + SDK (Android) |
### Instruções de execução:
**No Windows:** Para compilar o App para a plataforma Android, basta ir até a pasta principal do App (pasta onde se encontra o arquivo `App.js`), pressionar `shift` + `botão direito do mouse` e selecionar a opção "Abrir janela do PowerShell aqui".
Na nova janela, execute o comando `react-native run-android` (é necessário que o dispositivo esteja conectado via USB ao computador). Após isso, a versão de *debugging* do App estará instalada em seu dispositivo. Para instalar a versão *release*, vá ate a pasta `android/`, repita o processo de abrir a janela do PowerShell, e execute o comando  `./gradlew assembleRelease`. O arquivo .apk estará na pasta `android/app/build/outputs/apk/release/`.

**No MacOS:** O processo para gerar Apps para a plataforma Android no Mac é similar ao do Windows. Basta abrir uma janela do terminal na pasta principal do App e executar o mesmo comando. O mesmo vale para versões `release` (desde que os componentes necessários estejam presentes).
Já para iOS, o comando para gerar Apps *debug* é `react-native run-ios`, desde que o dispositivo apropriado esteja conectado via USB no Mac. Para exportar *builds release*, basta executar o código `react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios`. O bundle contendo a build estará na pasta `ios/`.

### Esclarecimentos
O tempo anormal de desenvolvimento do App deu-se por conta de problemas técnicos com meu ambiente de desenvolvimento. Meu computador principal, que já havia apresentando falhas relacionadas à fonte de energia, queimou e não foi possível o seu reparo em tempo hábil, tendo sido necessário o uso de meu Notebook, que não possuia nenhuma das ferramentas necessárias para o desenvolvimento. Logo, o tempo elevado.
