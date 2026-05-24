# Definition of commands for the Savage Worlds Dice Roller project

# Install dependencies
install:
    bun install

# Run tests
test:
    bun test

# Generate production build (bundle)
build:
    rm -rf dist/
    bun build ./src/content.js --outdir ./dist --target=browser --sourcemap=inline
    bun build ./src/background.js --outdir ./dist --target=browser --sourcemap=inline

# Package for store publication (Clean, Build, Test, and Zip)
export: build test
    zip -r savage-dice-roller-publish.zip manifest.json dist/ icons/*.png src/styles.css
    @echo "✅ Package 'savage-dice-roller-publish.zip' generated successfully for the Chrome Web Store!"
