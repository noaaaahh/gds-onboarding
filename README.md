# 온보딩 과제: React UI 개발 패키지

## 과제 목표
React UI 컴포넌트를 개발하고, 모노레포를 구성하여 개인 GitHub 계정의 GitHub Packages에 배포하는 과제를 수행합니다. 이 과제를 통해 lerna, yarn workspace, typescript, storybook, rollup 등을 익히게 됩니다.

## 과제 구성
1. **모노레포 구성**
2. **모노레포 구성 디렉토리**
3. **TypeScript 지원**
4. **Dialog 컴포넌트 개발**
5. **Rollup 빌드**
6. **Storybook 설정**
7. **GitHub Packages 배포**
8. (추가 구현) **버저닝 관리**

---

### 1. 모노레포 구성

lerna와 yarn workspace를 사용하여 모노레포를 구성합니다.

- **lerna**: 여러 패키지를 하나의 저장소에서 관리하기 위한 도구
- **yarn workspace**: 여러 패키지 간의 의존성을 쉽게 관리하기 위한 기능

### 2. 모노레포 구성 디렉토리

모노레포는 다음과 같은 구조로 구성합니다.

```
packages/
├── my-components/
└── my-docs/
```

### 3. TypeScript 지원

컴포넌트는 TypeScript로 작성하여 타입 지원을 해야 합니다. TypeScript 설정 파일(tsconfig.json)을 작성하고, 모든 컴포넌트 파일을 .tsx 확장자로 작성합니다.

### 4. 컴포넌트 개발

`packages/my-components` 디렉토리에서 Dialog 컴포넌트를 개발합니다. 디자인은 [Figma 링크](https://www.figma.com/design/TBQ0vT0mdGz7aepjxgfdc3/GDS---Components?node-id=27957-24284&t=J9bQQaodCJl7uVio-0)를 참고합니다.


### 5. Rollup 빌드

`packages/my-components` 패키지는 Rollup을 사용하여 빌드합니다. 빌드 결과물로는 ESM(ECMAScript Module)과 CJS(CommonJS) 형식을 생성합니다.

### 6. Storybook 설정

packages/my-docs 디렉토리에서 Storybook을 설정합니다. 이를 통해 개발된 컴포넌트의 문서를 작성하고 시각적으로 확인할 수 있습니다.

### 7. GitHub Packages 배포

개발된 패키지를 개인 GitHub 계정의 GitHub Packages에 배포합니다.

1.	GitHub 계정에서 개인 토큰을 생성합니다.
2.	프로젝트의 .npmrc 파일에 GitHub 패키지 레지스트리를 추가합니다.
3.	lerna publish 또는 lerna version 명령어를 사용하여 패키지를 배포합니다.
