"use client";

import { useState } from "react";
import { Search, Star, MapPin, Hotel, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Destinations Data
const featuredDestinations = [
  {
    id: 1,
    name: "Maldives",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80",
    rating: 4.8,
    price: "299",
    description:
      "The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. It's known for its beaches, blue lagoons, and extensive reefs.",
    attractions: [
      "White Sandy Beaches",
      "Luxury Resorts",
      "Underwater Maldives",
      "Marine Life",
    ],
    bestTimeToVisit: "November to April",
  },
  {
    id: 2,
    name: "Santorini",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80",
    rating: 4.9,
    price: "399",
    description:
      "Santorini is a volcanic island in the Cyclades group of the Greek Islands. It's known for its dramatically beautiful sunset views, white-washed buildings with blue domes, and stunning cliff-side architecture.",
    attractions: [
      "Oia Sunset",
      "Blue Domed Churches",
      "Volcanic Beaches",
      "Ancient Ruins",
    ],
    bestTimeToVisit: "April to October",
  },
  {
    id: 3,
    name: "Bali",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80",
    rating: 4.7,
    price: "199",
    description:
      "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs. It's a popular destination for its unique culture, spiritual retreats, and vibrant arts scene.",
    attractions: [
      "Ubud Monkey Forest",
      "Temple Tours",
      "Beach Clubs",
      "Rice Terraces",
    ],
    bestTimeToVisit: "April to October",
  },
  {
    id: 4,
    name: "Kerala",
    image:
      "https://th.bing.com/th/id/OIP.uT7Wl0kVemIz-HmT58PSqwHaEK?w=333&h=187&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    rating: 4.8,
    price: "149",
    description:
      "Kerala, known as 'God's Own Country', is a tropical paradise in southern India famous for its lush green landscapes, backwaters, tea plantations, and unique culture. It offers a perfect blend of natural beauty and rich traditions.",
    attractions: [
      "Backwater Houseboats",
      "Munnar Tea Plantations",
      "Ayurvedic Resorts",
      "Wildlife Sanctuaries",
      "Beaches of Kovalam",
    ],
    bestTimeToVisit: "September to March",
  },
  {
    id: 5,
    name: "Ladakh",
    image:
      "https://th.bing.com/th/id/OIP.aaa-B2cjdKhBHv1jKKqg9AHaEy?w=310&h=200&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    rating: 4.9,
    price: "199",
    description:
      "Ladakh is a high-altitude desert region in northern India, known for its stunning mountain landscapes, Buddhist monasteries, and unique culture. It offers breathtaking views of the Himalayan range and a serene, otherworldly experience.",
    attractions: [
      "Pangong Lake",
      "Thiksey Monastery",
      "Nubra Valley",
      "High Mountain Passes",
      "Buddhist Culture",
    ],
    bestTimeToVisit: "June to September",
  },
  {
    id: 6,
    name: "Goa",
    image:
      "https://th.bing.com/th/id/OIP.dpYIP0oa5Rh1A4ttHr1rygHaE8?w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    rating: 4.7,
    price: "129",
    description:
      "Goa is a vibrant coastal state in western India, renowned for its beautiful beaches, Portuguese-influenced architecture, vibrant nightlife, and unique blend of Indian and European cultures.",
    attractions: [
      "Beaches",
      "Water Sports",
      "Portuguese Churches",
      "Night Markets",
      "Seafood Cuisine",
    ],
    bestTimeToVisit: "November to March",
  },
  {
    id: 7,
    name: "Andaman Islands",
    image:
      "https://th.bing.com/th/id/OIP.EuXpIRvi3V-h9TfzQ7souQHaEb?w=322&h=193&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    rating: 4.8,
    price: "249",
    description:
      "The Andaman Islands are a stunning archipelago in the Bay of Bengal, offering pristine beaches, crystal-clear waters, rich marine life, and a perfect tropical paradise experience with unique indigenous cultures.",
    attractions: [
      "Cellular Jail",
      "Coral Reefs",
      "Havelock Island",
      "Scuba Diving",
      "Pristine Beaches",
    ],
    bestTimeToVisit: "October to May",
  },
  {
    id: 8,
    name: "Rajasthan",
    image:
      "https://th.bing.com/th/id/OIP.TZ_9gEdN97s9t8y67ZolbgHaEm?w=274&h=180&c=7&r=0&o=5&pid=1.7",
    rating: 4.8,
    price: "179",
    description:
      "Rajasthan, the 'Land of Kings', is a vibrant state in northern India known for its majestic palaces, colorful culture, desert landscapes, and rich historical heritage. It offers a mesmerizing journey through royal traditions and architectural wonders.",
    attractions: [
      "Jaipur Pink City",
      "Mehrangarh Fort",
      "Camel Safari",
      "Desert Festivals",
      "Palatial Hotels",
    ],
    bestTimeToVisit: "October to March",
  },
  {
    id: 9,
    name: "Sikkim",
    image:
      "https://th.bing.com/th/id/OIP.52Gy9Hyk5U3ozRr1z9RfaAHaFF?w=301&h=207&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    rating: 4.7,
    price: "169",
    description:
      "Sikkim is a northeastern Indian state nestled in the Himalayas, known for its biodiversity, pristine landscapes, Buddhist monasteries, and stunning mountain views. It offers a unique blend of natural beauty, cultural richness, and spiritual serenity.",
    attractions: [
      "Gangtok City",
      "Tsongmo Lake",
      "Rumtek Monastery",
      "Himalayan Views",
      "Tea Gardens",
    ],
    bestTimeToVisit: "March to May and September to November",
  },
];

// Destination Card Component
const DestinationCard = ({ destination, onViewDetails }) => (
  <div className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
    <div className="relative h-64">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium">{destination.rating}</span>
        </div>
      </div>
    </div>
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="h-4 w-4 text-primary" />
        <h3 className="text-xl font-semibold">{destination.name}</h3>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-primary">
          From ₹{destination.price}
        </span>
        <Button variant="outline" onClick={() => onViewDetails(destination)}>
          View Details
        </Button>
      </div>
    </div>
  </div>
);

// Destination Details Dialog Component
const DestinationDetailsDialog = ({ destination, onClose, onBookNow }) => (
  <Dialog open={!!destination} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>{destination.name}</DialogTitle>
      </DialogHeader>
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="text-lg font-semibold">
              {destination.rating} Rating
            </span>
          </div>
          <p className="text-gray-600 mb-4">{destination.description}</p>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Top Attractions:</h4>
            <ul className="list-disc pl-5">
              {destination.attractions.map((attraction, index) => (
                <li key={index} className="text-gray-700">
                  {attraction}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Best Time to Visit:</h4>
            <p className="text-gray-700">{destination.bestTimeToVisit}</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              Starting from ₹{destination.price}
            </span>
            <Button
              onClick={onBookNow}
              className="bg-[#DE4C71] hover:bg-[#c93b5e] text-white"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

// Booking Confirmation Dialog Component
const BookingConfirmationDialog = ({ destination, onClose }) => (
  <Dialog open={true} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[500px]">
      <div className="flex flex-col items-center text-center">
        <Check className="h-16 w-16 text-green-500 mb-4" />
        <DialogTitle className="text-2xl mb-4">Destination Booked!</DialogTitle>
        <DialogDescription className="text-gray-600 mb-6">
          Congratulations! You've successfully booked your trip to{" "}
          {destination.name}. Get ready for an incredible journey filled with
          breathtaking experiences and unforgettable memories. Pack your bags,
          embrace the adventure, and enjoy every moment of your upcoming trip!
        </DialogDescription>
        <DialogFooter className="w-full">
          <Button
            onClick={onClose}
            className="w-full bg-[#DE4C71] hover:bg-[#c93b5e] text-white"
          >
            Explore More Destinations
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  </Dialog>
);

// Main Home Component
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [searchCategory, setSearchCategory] = useState("destination");

  const filteredDestinations = featuredDestinations.filter((destination) => {
    if (searchCategory === "destination") {
      return destination.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchCategory === "price") {
      return destination.price.includes(searchQuery);
    } else if (searchCategory === "rating") {
      return destination.rating.toString().includes(searchQuery);
    }
    return true;
  });

  const handleSearchCategoryChange = (category) => {
    setSearchCategory(category);
    setSearchQuery("");
  };

  const handleViewDetails = (destination) => {
    setSelectedDestination(destination);
  };

  const handleBookNow = () => {
    setIsBookingConfirmed(true);
  };

  const closeDialogs = () => {
    setSelectedDestination(null);
    setIsBookingConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">TravelBuddy</div>
        <Link href="/login">
          <Button
            variant="outline"
            className="bg-white text-[#DE4C71] hover:bg-gray-100"
          >
            Login / Signup
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl text-center mb-12">
            Explore the World's most beautiful destinations
          </p>

          <div className="w-full max-w-3xl bg-white rounded-lg p-4 flex gap-4">
            <div className="flex items-center gap-2">
              <select
                value={searchCategory}
                onChange={(e) => handleSearchCategoryChange(e.target.value)}
                className="p-2 border rounded bg-white text-black"
              >
                <option value="destination">Destination</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <div className="flex-1">
              <Input
                type="text"
                placeholder={`Search by ${searchCategory}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button size="lg">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Destinations Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onViewDetails={handleViewDetails}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-3">
                No destinations found
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Destination Details Dialog */}
      {selectedDestination && (
        <DestinationDetailsDialog
          destination={selectedDestination}
          onClose={closeDialogs}
          onBookNow={handleBookNow}
        />
      )}

      {/* Booking Confirmation Dialog */}
      {isBookingConfirmed && (
        <BookingConfirmationDialog
          destination={selectedDestination}
          onClose={closeDialogs}
        />
      )}
    </div>
  );
}
