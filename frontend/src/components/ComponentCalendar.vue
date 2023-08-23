<template>
  <!-- Codigo de ComponentCalendar.vue-->
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          :time-format="'24hr'"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        >
        <template v-slot:event="{ event }">
          <div>
            <div>{{ event.name }}</div>
            <div>{{ getTime(new Date(event.start))  }} - {{ getTime(new Date(event.end))  }}</div>
          </div>
        </template>
      
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title> {{ selectedEvent.name }} </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <span> Hora de inicio: {{ getTime(new Date(selectedEvent.start)) }} </span>
              <v-spacer></v-spacer>
              <span> Hora de fin: {{ getTime(new Date(selectedEvent.end)) }} </span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="red"
                @click="selectedOpen = false"
              >
                <v-icon> mdi-close-circle</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      allEvents: [],
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
    }),
    props: {
      selectedClassroom: {
        type: String,
        required: true
      },
      newReserve: {
        type: Array,
      }
    },
    mounted () {
      this.$refs.calendar.checkChange()
      this.getAllEvents();
    },
    watch: {
     selectedClassroom: {
        handler(newClassroom) {
          this.events = this.allEvents.filter(event => event.id_aula === newClassroom);
          this.$refs.calendar.updateEvents();
        },
        immediate: true
      }
    },

  

    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      async getAllEvents() {
      await this.axios
        .get("apiv1/reservaaula")
        .then((response) => {
          this.allEvents = response.data.map((event) => ({
            start: event.fh_desde, 
            end:event.fh_hasta, 
            name: event.detalle, 
            color: 'blue',
            id_aula: event.id_aula
            
          }));

        })
        .catch((e) => {
          this.errors = e;
          // Capturamos los errores
        });

        
        
    },

    async saveReserve() {
      await this.axios
        .post("apiv1/reservaaula", 
        {
            id_aula: this.newReserve[0].idClassroom,
            fh_desde: new Date (this.newReserve[0].startDate + ' ' + this.newReserve[0].startHour).toLocaleString('es-ES', {timeZone: 'America/Argentina'}),
            fh_hasta: new Date (this.newReserve[0].endDate + ' ' + this.newReserve[0].endHour).toLocaleString('es-Es', {timeZone: 'America/Argentina'}),
            detalle: this.newReserve[0].detail,

        })
        .then((response) => {
          this.$refs.calendar.updateEvents();
          console.log(response.data);
        })

    },

    getTime(date) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
      
    },



  }
</script>
  
  