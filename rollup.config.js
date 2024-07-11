import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

import fs from 'fs';
import { readPackageUpSync } from 'read-package-up';
import PeerDepsExternal from 'rollup-plugin-peer-deps-external';

const input = 'index.ts';

const { packageJson: pkg } = readPackageUpSync({
    cwd: fs.realpathSync(process.cwd()), // node 명령을 호출한 작업 디렉토리의 절대경로
});

function buildJS(input, output, format) {
    const defaultOutputConfig = {
        format,
        sourcemap: true,
    };

    const esOutputConfig = {
        ...defaultOutputConfig,
        dir: output,
    };

    const cjsOutputConfig = {
        ...defaultOutputConfig,
        file: output,
    };

    const externals = () => {
        const defaultExternal = [/@babel\/runtime/];
        const dependencies = Object.keys(pkg?.dependencies || {});
        const peerDependencies = Object.keys(pkg?.peerDependencies || {});

        return { ...defaultExternal, ...dependencies, ...peerDependencies };
    };

    const extensions = ['.js', '.jsx', '.ts', '.tsx'];

    const plugins = [
        // 바벨 설정
        babel({
            babelHelpers: 'runtime', // 바벨 헬퍼 함수를 번들 결과에 포함하지 않음
            exclude: 'node_modules/**',
            extensions,
            presets: [
                '@babel/preset-env', // es6 compile
                '@babel/preset-react', // react compile
                '@babel/preset-typescript', // typescript compile
            ],
            plugins: ['@babel/plugin-transform-runtime'],
        }),
        commonjs({ extensions }), // commonjs 코드를 es6로 변환
        nodeResolve({ extensions }), // 라이브러리에서 외부 의존성 사용하도록, 트리 셰이킹도 가능하게
        PeerDepsExternal(), // 피어 디펜던시를 빌드 결과에 포함하지 않음
        terser(), // 번들 결과를 minify,
        postcss({
            modules: true,
        }),
    ];

    return {
        input, // 진입점
        output: [format === 'es' ? esOutputConfig : cjsOutputConfig], // 결과물 저장 장소
        preserveModules: format === 'es', // 모듈 결과물을 단일 파일로 생성할 것인가
        external: externals(), // 외부 종속성 처리
        plugins, // 플러그인
    };
}

export default [
    buildJS(input, pkg?.main, 'cjs'),
    buildJS(input, 'dist/esm', 'es'),
];
