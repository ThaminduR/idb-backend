#! /bin/bash
cd /home/ubuntu/idb/idb-backend
sudo cp /home/ubuntu/idb/.env /home/ubuntu/idb/idb-backend
pm2 delete idb
pm2 start index.js --name idb
