#! /bin/bash

cd /home/ubuntu/idb/idb-backend

file=".env"

if [ -f $file ] ; then 
    sudo rm $file

fi
