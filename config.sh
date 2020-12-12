#!/bin/bash

mkdir -p $STATIC_LOCATION/config/

echo { >> $STATIC_LOCATION/config/properties.json
echo \"INVENTORY_URL\": $INVENTORY_URL >> $STATIC_LOCATION/config/properties.json
echo } >> $STATIC_LOCATION/config/properties.json
