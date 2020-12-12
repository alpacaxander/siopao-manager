#!/bin/bash

mkdir -p $STATIC_LOCATION/config/

rm $STATIC_LOCATION/config/properties.json
echo "{" >> $STATIC_LOCATION/config/properties.json
echo \"INVENTORY_URL\": \"$INVENTORY_URL\", >> $STATIC_LOCATION/config/properties.json
echo \"FILES_URL\": \"$FILES_URL\" >> $STATIC_LOCATION/config/properties.json
echo "}" >> $STATIC_LOCATION/config/properties.json
