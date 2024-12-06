export const VENUE_CONFIGURATIONS = {
  small: {
    size: 'Small Venue (up to 100 seats)',
    sections: [
      { type: 'VIP', defaultCapacity: 20 },
      { type: 'Regular', defaultCapacity: 80 }
    ]
  },
  medium: {
    size: 'Medium Venue (up to 300 seats)',
    sections: [
      { type: 'Premium VIP', defaultCapacity: 50 },
      { type: 'VIP', defaultCapacity: 100 },
      { type: 'Regular', defaultCapacity: 150 }
    ]
  },
  large: {
    size: 'Large Venue (up to 500 seats)',
    sections: [
      { type: 'Premium VIP', defaultCapacity: 100 },
      { type: 'VIP', defaultCapacity: 150 },
      { type: 'Regular', defaultCapacity: 250 }
    ]
  }
};