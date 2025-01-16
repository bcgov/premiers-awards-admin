<template>
  <Fieldset legend="Nominations dates">
    <div class="card">
        
    
        <div class="p-fluid grid">

            <div class="field col-12 md:col-6">
                
                Open date: 
                <Calendar v-model="nominationDates.open" showIcon :showOnFocus="false" dateFormat="yy-mm-dd" showTime />
            </div>
            
            <div class="field col-12 md:col-6">
                
                Closing date: 
                <Calendar v-model="nominationDates.close" showIcon :showOnFocus="false" dateFormat="yy-mm-dd" showTime />
            </div>
        </div>
        <div>
            <Button label="Update" @click="updateNominationDates" />
        </div>
        
    </div>
  </Fieldset>
</template>

<script setup>

import { ref } from "vue";

import {storeToRefs} from "pinia/dist/pinia";
import {settingsStore} from "@/stores/settings.store";

// load settings state
const { selected, error, items } = storeToRefs(settingsStore());

const store = settingsStore();

/* 
  PA-149/160 Allow for the nominations close date to be changed by PA team
  Get the full setting object (type, label, value, etc) from items, and then find the nominationsclose key. 
  This is needed so that the setting can be updated again. Simply using the store.lookup does not return enough data. 
*/
const globalSettings = items.value.find(x => x.type === "globalSettings");

const formatDateForLocalTimezone = date => {
  
  if ( date == null ) return "";
  
  return new Date(date);
};

const nominationDates = ref ({ close: formatDateForLocalTimezone(globalSettings.value['nominationsclose']), open: formatDateForLocalTimezone(globalSettings.value['nominationsopen']) });

const updateNominationDates = async () => {
  
  globalSettings.value['nominationsclose'] = nominationDates.value['close'];
  globalSettings.value['nominationsopen'] = nominationDates.value['open'];
  selected.value = globalSettings;
  await store.update();
  await reload();

};

const reload = async () => {
  await store.getAll();
  reset();
};

</script>