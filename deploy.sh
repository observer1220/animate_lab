#!/bin/bash

# Step 1: 將原始碼更新至 Github main branch
echo "Updating source code to GitHub..."
git add . || error_exit "Error: Git add failed"
current_date=$(date +"%Y-%m-%d")
git commit -m "$current_date" || error_exit "Error: Git commit failed"
git push origin main || error_exit "Error: Git push failed"
