#!/bin/bash
ssh nas "rm -rf /volume1/web/*"
scp -P 4269 -r public/* nas:/volume1/web/.
ssh nas "cd /volume1/web && find . -type d -exec chmod 0750 {} \\;"
ssh nas "cd /volume1/web && find . -type f -exec chmod 0640 {} \\;"