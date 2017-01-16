module.exports = {
    "parser": "babel-eslint",
    "env": {
        node: true,
        browser: true,
        webextensions: true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "modules": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": ["react"],
    "rules": {
        "eqeqeq": 2,
        "wrap-iife": [
            2, "any"
        ],
        "no-use-before-define": 2,
        "no-caller": 2,
        "no-undef": 2,
        "no-unused-vars": 2,
        "no-eq-null": 2,
        "no-const-assign": 2,
        "dot-notation": 0,
        "max-len": [
            2, 120
        ],
        "camelcase": [
            2, {
                "properties": "never"
            }
        ],
        "indent": [
            2,
            4, {
                "SwitchCase": 1
            }
        ],
        "quotes": [
            2, "single"
        ],
        "linebreak-style": [
            2, "unix"
        ],
        "no-multi-str": 2,
        "no-mixed-spaces-and-tabs": 2,
        "no-trailing-spaces": 2,
        "padded-blocks": [
            2, "never"
        ],
        "space-unary-ops": 2,
        "one-var": [
            2, {
                "initialized": "never"
            }
        ],
        "curly": [
            2, "all"
        ],
        "operator-linebreak": [
            2, "after"
        ],
        "keyword-spacing": [2],
        "space-return-throw-case": 0,
        "brace-style": [
            2,
            "stroustrup", {
                "allowSingleLine": true
            }
        ],
        "array-bracket-spacing": [
            2, "never"
        ],
        "space-infix-ops": 2,
        "space-before-blocks": [
            2, "always"
        ],
        "eol-last": 2,
        "space-in-parens": [
            2, "never"
        ],
        "react/display-name": 1,
        "react/jsx-boolean-value": 1,
        "react/jsx-closing-bracket-location": 1,
        "react/jsx-handler-names": 1,
        "react/jsx-indent-props": 1,
        "react/jsx-key": 1,
        "react/jsx-no-duplicate-props": 1,
        "react/jsx-no-undef": 1,
        "react/jsx-pascal-case": 1,
        "react/jsx-sort-props": 1,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/no-danger": 1,
        "react/no-did-mount-set-state": 1,
        "react/no-did-update-set-state": 1,
        "react/no-direct-mutation-state": 1,
        "react/no-multi-comp": 1,
        "react/no-unknown-property": 1,
        "react/prefer-es6-class": 1,
        "react/prop-types": 1,
        "react/react-in-jsx-scope": 1,
        "react/self-closing-comp": 1,
        "react/sort-comp": 1
    }
};
