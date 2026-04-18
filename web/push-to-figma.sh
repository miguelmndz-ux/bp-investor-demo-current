#!/bin/bash
# Generate the use_figma code for each screenshot
declare -A frames
frames["1.0-apex-scan-in-progress"]="7975:2254"
frames["1.1-apex-scan-complete"]="7975:2255"
frames["1.2-apex-admin-dashboard"]="7975:2253"
frames["1.2.1-outreach-draft-modal"]="7975:2258"
frames["1.2.2-outreach-sent-success-overlay"]="7991:32"
frames["1.3-community-profile-page"]="7975:2256"
frames["5.0-discovery-page"]="7975:2259"
frames["5.0.1-session-preview-panel"]="7991:38"

for name in "${!frames[@]}"; do
  frameId="${frames[$name]}"
  b64=$(base64 -w0 "screenshots/compressed/${name}.jpg")
  echo "=== $name → $frameId ($(echo -n "$b64" | wc -c) chars b64) ==="
done
