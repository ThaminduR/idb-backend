#! /bin/bash
cd /home/ubuntu/idb/idb-backend
sudo cp /home/ubuntu/idb/.env /home/ubuntu/idb/idb-backend
sudo pm2 start index.js
