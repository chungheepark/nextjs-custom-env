# NextJS ENV 설정

### 시작하기

- 프로젝트 클론 후 .env.local을 사용하여 환경에 맞게 구성합니다.

```
$ npm run dev
```

### 빌드하기

```
APP_ENV=dev
ORG=bbb
APP=bbb-app
SHORT_SHA=$(git rev-parse --short=6 HEAD)
TAG="${ENV}-${SHORT_SHA}"

docker build --build-arg APP_ENV=$APP_ENV --build-arg --tag "${ORG}/${APP}:${TAG}" .
docker run --p 3000:3000 "${ORG}/${APP}:${TAG}"
```

### features

- standalone build
- multistage build
- mutl env build by --build-arg

### .env 파싱 로직

https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#environment-variable-load-order

1. (PASS) process.env
2. (PASS) .env.$(NODE_ENV).local
3. (WARNING) .env.local (Not checked when NODE_ENV is test.)
4. (HERE) .env.$(NODE_ENV)
5. .env

> .env.local이 있으면 파싱됨 -> 그래서 .env.local을 .gitignore에 등록해서 cd 머신에서는 .env.local이 포함되지 않도록 합니다.

> 4번 보면 `.env.$(NODE_ENV)` 이녀석을 찾는다고 하는데 `NODE_ENV`는 `production`일거라 `.env.production`으로 카피 해놓으면 알아서 잘 찾는다는 것을 알 수 있습니다.

> 4번 때문에 NODE_ENV를 사용해서 환경변수를 설정하는 분들이 있습니다. NODE_ENV를 사용해서 런타임 / 빌드타임 최적화를 하는 플러그인들이 다수 있기 때문에 NODE_ENV를 사용한 커스텀 환경은 불안한 부분이 있습니다.

> 그리고 런타임 환경변수를 사용하게 되면 SSG 빌드 같은 스태틱 파일 서빙을 위한 빌드를 사용할 수 없다고 합니다. 최적화의 이슈일 것 같습니다. https://fe-developers.kakaoent.com/2022/220505-runtime-environment/ 이런 글이 있어 런타임에 환경변수를 주입하는 방법도 찾아볼 수 있습니다.
