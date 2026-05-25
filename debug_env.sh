#!/usr/bin/env bash
source ./.specify/scripts/bash/common.sh
echo "REPO_ROOT: $(get_repo_root)"
echo "CURRENT_BRANCH: $(get_current_branch)"
echo "HAS_GIT: $(has_git || echo false)"
get_feature_paths
