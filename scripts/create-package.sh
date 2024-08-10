#!/bin/sh

# Function to display help message
show_help() {
  echo "Usage: $0 <name> <scope> [--N]"
  echo
  echo "Arguments:"
  echo "  name    Package name"
  echo "  scope   Package scope (e.g., 'frontend', 'backend')"
  echo "  --N     Disable the --dry-run option"
  echo
  echo "Example:"
  echo "  $0 my-package backend --N"
}

# Argument validation
if [ "$#" -lt 2 ]; then
  echo "Error: Incorrect number of arguments."
  show_help
  exit 1
fi

name=$1
scope=$2
dry="--dry-run"

# Check for the --N option
if [ "$#" -eq 3 ] && [ "$3" = "--N" ]; then
  dry=""
elif [ "$#" -gt 3 ]; then
  echo "Error: Too many arguments."
  show_help
  exit 1
fi

command="pnpm exec nx generate @nx/js:library \
    --name=$name \
    --bundler=swc \
    --directory=packages/$name \
    --importPath=@hexon/$name \
    --publishable=true \
    --includeBabelRc=true \
    --projectNameAndRootFormat=as-provided \
    --unitTestRunner=jest \
    --tags=scope:$scope \
    --no-interactive \
    $dry"

eval $command