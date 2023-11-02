import { create } from 'zustand';

interface TripState {
  trips: any[];
  initTrips: (trips: any[]) => void;
  updateTrip: (trip: any) => void;
  startTrip: (trip: any) => void;
  finishTrip: (trip: any) => void;
}

const useTripStore = create<TripState>()(set => ({
  trips: [],
  initTrips: trips => set({ trips }),
  updateTrip: trip =>
    set(state => {
      const index = state.trips.find(t => t.id === trip.id);
      if (index === -1) {
        return { trips: [trip, ...state.trips] };
      }
      let newTrips = [...state.trips];
      newTrips.splice(index, 1, trip);
      return { trips: newTrips };
    }),
  startTrip: trip =>
    set(st => {
      const index = st.trips.findIndex(t => t.id === trip.id);
      if (index === -1) {
        return { trips: [trip, ...st.trips] };
      }
      return st;
    }),
  finishTrip: trip =>
    set(st => {
      const index = st.trips.find(t => t.id === trip.id);
      if (index === -1) {
        return st;
      }
      const newTrips = [...st.trips];
      newTrips.splice(index, 1);
      return { trips: newTrips };
    }),
}));

export default useTripStore;
