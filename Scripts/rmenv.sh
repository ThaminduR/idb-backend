#! /bin/bash
cd /home/ubuntu/idb/idb-backend
sudo rm .env
pm2 delete idb
