export const products = [
  // LIGHTING (6)
  {
    id: "p-001",
    name: "Aurora Desk Lamp",
    category: "lighting",
    price: 89.00,
    originalPrice: 119.00,
    rating: 4.6,
    reviewCount: 128,
    images: ["https://images.unsplash.com/photo-1534349762230-e0cadf39f574?auto=format&fit=crop&w=800&q=80"],
    description: "An architectural desk lamp featuring warm, dimmable LED diffusion housed in brushed anodized aluminum. Designed to anchor evening study and focused writing sessions.",
    specifications: [
      { label: "Material", value: "Brushed aluminum" },
      { label: "Color Temp", value: "2200K - 3000K adjustable" },
      { label: "Power", value: "USB-C powered (adapter included)" },
      { label: "Dimensions", value: "42cm x 15cm x 35cm" }
    ],
    createdAt: "2026-03-14T00:00:00.000Z",
    featured: true,
    popular: false
  },
  {
    id: "p-002",
    name: "Ember Table Lantern",
    category: "lighting",
    price: 64.00,
    originalPrice: null,
    rating: 4.4,
    reviewCount: 94,
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"],
    description: "Portable cordless lantern casting an amber-tinted glow reminiscent of traditional candlelight. Perfect for bedside tables and quiet evening patios.",
    specifications: [
      { label: "Material", value: "Frosted glass and brass" },
      { label: "Battery Life", value: "Up to 24 hours on low" },
      { label: "Charging", value: "Magnetic wireless dock" },
      { label: "Water Resistance", value: "IP44 splashproof" }
    ],
    createdAt: "2026-04-01T00:00:00.000Z",
    featured: false,
    popular: true
  },
  {
    id: "p-003",
    name: "Halo Floor Light",
    category: "lighting",
    price: 149.00,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 210,
    images: ["https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"],
    description: "Minimalist floor projection lamp casting a soft halo against walls. Creates a serene nocturnal atmosphere in any corner of the room.",
    specifications: [
      { label: "Material", value: "Carbon steel stem, optical lens" },
      { label: "Height", value: "140 cm adjustable" },
      { label: "Control", value: "Foot dimmer switch" },
      { label: "Weight", value: "3.2 kg" }
    ],
    createdAt: "2026-02-10T00:00:00.000Z",
    featured: true,
    popular: false
  },
  {
    id: "p-004",
    name: "Dusk Smart Bulb Set",
    category: "lighting",
    price: 39.00,
    originalPrice: 49.00,
    rating: 4.3,
    reviewCount: 76,
    images: ["https://images.unsplash.com/photo-1550985616-11411d33b6c4?auto=format&fit=crop&w=800&q=80"],
    description: "Set of two warm-spectrum connected bulbs designed to automatically synchronize color temperature with evening twilight.",
    specifications: [
      { label: "Base", value: "E26 / E27 standard" },
      { label: "Protocol", value: "Thread & Matter compatible" },
      { label: "Lumen Output", value: "800 lm max" },
      { label: "Lifespan", value: "25,000 hours" }
    ],
    createdAt: "2026-05-12T00:00:00.000Z",
    featured: false,
    popular: true
  },
  {
    id: "p-005",
    name: "Lumen Wall Sconce",
    category: "lighting",
    price: 72.00,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 45,
    images: ["https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80"],
    description: "Rechargeable magnetic wall sconce offering indirect uplighting. Installs cleanly without hardwiring.",
    specifications: [
      { label: "Mounting", value: "Magnetic adhesive bracket" },
      { label: "Finish", value: "Matte black powder coat" },
      { label: "Battery", value: "3200 mAh rechargeable" }
    ],
    createdAt: "2026-01-20T00:00:00.000Z",
    featured: false,
    popular: false
  },
  {
    id: "p-006",
    name: "Glow Cube Night Light",
    category: "lighting",
    price: 29.00,
    originalPrice: null,
    rating: 4.2,
    reviewCount: 62,
    images: ["https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=800&q=80"],
    description: "Hand-polished solid alabaster cube diffusing gentle, organic light patterns across bedside surfaces.",
    specifications: [
      { label: "Material", value: "Natural alabaster stone" },
      { label: "Dimensions", value: "10cm x 10cm x 10cm" },
      { label: "Switch", value: "Touch sensitive top panel" }
    ],
    createdAt: "2026-06-05T00:00:00.000Z",
    featured: false,
    popular: true
  },

  // AUDIO (6)
  {
    id: "p-007",
    name: "Resonance Bookshelf Speaker",
    category: "audio",
    price: 179.00,
    originalPrice: 219.00,
    rating: 4.9,
    reviewCount: 184,
    images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"],
    description: "Acoustically tuned wooden enclosure delivering warm mid-ranges and deep bass response, optimized for vinyl and midnight streaming.",
    specifications: [
      { label: "Drivers", value: "1-inch silk dome tweeter, 4-inch woofer" },
      { label: "Connectivity", value: "Bluetooth 5.3, AUX, Optical" },
      { label: "Cabinet", value: "MDF with walnut wood veneer" },
      { label: "Frequency", value: "50Hz - 20kHz" }
    ],
    createdAt: "2026-02-28T00:00:00.000Z",
    featured: true,
    popular: false
  },
  {
    id: "p-008",
    name: "Murmur Portable Speaker",
    category: "audio",
    price: 99.00,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 112,
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80"],
    description: "Compact cylindrical bluetooth speaker wrapped in acoustic wool fabric. Delivers 360-degree sound for evening gatherings.",
    specifications: [
      { label: "Battery", value: "18 hours playback" },
      { label: "Rating", value: "IP67 dust and water proof" },
      { label: "Weight", value: "480g" }
    ],
    createdAt: "2026-03-30T00:00:00.000Z",
    featured: false,
    popular: true
  },
  {
    id: "p-009",
    name: "Velvet Over-Ear Headphones",
    category: "audio",
    price: 199.00,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 156,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"],
    description: "Plush memory foam earcups and active noise cancellation designed for late-night listening without disturbing the house.",
    specifications: [
      { label: "ANC", value: "Hybrid active noise cancellation" },
      { label: "Battery", value: "40 hours with ANC on" },
      { label: "Codecs", value: "AAC, SBC, aptX Low Latency" }
    ],
    createdAt: "2026-01-15T00:00:00.000Z",
    featured: true,
    popular: false
  },
  {
    id: "p-010",
    name: "Hush Wireless Earbuds",
    category: "audio",
    price: 129.00,
    originalPrice: 159.00,
    rating: 4.4,
    reviewCount: 88,
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"],
    description: "Ultra-low profile earbuds engineered with sleep-comfort silicone tips for wearing while resting or meditating.",
    specifications: [
      { label: "Profile", value: "Ergonomic flush-to-ear fit" },
      { label: "Battery", value: "6h buds + 24h case" },
      { label: "Sound", value: "Calming soundscape generator built-in" }
    ],
    createdAt: "2026-04-18T00:00:00.000Z",
    featured: false,
    popular: true
  },
  {
    id: "p-011",
    name: "Vinyl Drift Turntable",
    category: "audio",
    price: 249.00,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 92,
    images: ["https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80"],
    description: "Belt-driven turntable with minimalist matte plinth and precision aluminum tonearm for authentic evening analog sessions.",
    specifications: [
      { label: "Speeds", value: "33-1/3 and 45 RPM" },
      { label: "Cartridge", value: "Audio-Technica AT3600L pre-mounted" },
      { label: "Outputs", value: "Built-in phono preamp with switchable line out" }
    ],
    createdAt: "2026-05-20T00:00:00.000Z",
    featured: false,
    popular: false
  },
  {
    id: "p-012",
    name: "Echo Mini Soundbar",
    category: "audio",
    price: 139.00,
    originalPrice: null,
    rating: 4.3,
    reviewCount: 54,
    images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"],
    description: "Compact TV and desktop soundbar tuned for clear dialogue and atmospheric movie nights.",
    specifications: [
      { label: "Connectivity", value: "HDMI ARC, Optical, Bluetooth" },
      { label: "Profile", value: "Low-profile screen-fit design" }
    ],
    createdAt: "2026-06-10T00:00:00.000Z",
    featured: false,
    popular: false
  },

  // DESK (6)
  {
    id: "p-013",
    name: "Slate Desk Mat",
    category: "desk",
    price: 35.00,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 142,
    images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"],
    description: "Supple vegan leather desk pad providing a smooth, sound-dampening surface for keyboard and mouse work.",
    specifications: [
      { label: "Material", value: "Polyurethane vegan leather" },
      { label: "Dimensions", value: "90 cm x 40 cm" },
      { label: "Backing", value: "Natural suede anti-slip" }
    ],
    createdAt: "2026-03-01T00:00:00.000Z",
    featured: false,
    popular: true
  },
  {
    id: "p-014",
    name: "Monolith Monitor Stand",
    category: "desk",
    price: 59.00,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 98,
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"],
    description: "Solid bent-aluminum monitor riser creating organized storage space underneath while elevating screens to ergonomic height.",
    specifications: [
      { label: "Material", value: "4mm solid aluminum alloy" },
      { label: "Capacity", value: "Supports up to 25 kg" },
      { label: "Dimensions", value: "52cm x 22cm x 7cm" }
    ],
    createdAt: "2026-02-15T00:00:00.000Z",
    featured: false,
    popular: false
  },
  {
    id: "p-015",
    name: "Brass Pen Tray",
    category: "desk",
    price: 28.00,
    originalPrice: 36.00,
    rating: 4.5,
    reviewCount: 44,
    images: ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"],
    description: "Heavyweight cast brass tray for organizing writing instruments and small daily carry essentials.",
    specifications: [
      { label: "Material", value: "Solid raw brass with clear lacquer" },
      { label: "Weight", value: "340g" }
    ],
    createdAt: "2026-05-05T00:00:00.000Z",
    featured: false,
    popular: false
  },
  {
    id: "p-016",
    name: "Orbit Wireless Charger",
    category: "desk",
    price: 45.00,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 167,
    images: ["https://images.unsplash.com/photo-1622445275574-5552758369cb?auto=format&fit=crop&w=800&q=80"],
    description: "Weighted zinc-alloy magnetic fast wireless charger designed to stay securely anchored to your desk.",
    specifications: [
      { label: "Output", value: "15W fast charging" },
      { label: "Interface", value: "Braided USB-C cable included" }
    ],
    createdAt: "2026-04-10T00:00:00.000Z",
    featured: false,
    popular: true
  },
  {
    id: "p-017",
    name: "Folio Leather Organizer",
    category: "desk",
    price: 54.00,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 83,
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"],
    description: "Minimalist desktop folio with compartments for notebooks, pens, and cards, crafted from vegetable-tanned leather.",
    specifications: [
      { label: "Leather", value: "Full-grain Italian cowhide" },
      { label: "Stitching", value: "Waxed nylon thread" }
    ],
    createdAt: "2026-01-10T00:00:00.000Z",
    featured: true,
    popular: false
  },
  {
    id: "p-018",
    name: "Atlas Cable Dock",
    category: "desk",
    price: 24.00,
    originalPrice: null,
    rating: 4.3,
    reviewCount: 51,
    images: ["https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80"],
    description: "Weighted silicone cable management block that keeps charging cords from sliding off the desk edge.",
    specifications: [
      { label: "Slots", value: "4 multi-size cable channels" },
      { label: "Base", value: "Micro-suction micro-grip pad" }
    ],
    createdAt: "2026-06-15T00:00:00.000Z",
    featured: false,
    popular: false
  },

  // FRAGRANCE (6)
  {
    id: "p-019",
    name: "Midnight Cedar Candle",
    category: "fragrance",
    price: 34.00,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 172,
    images: ["https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80"],
    description: "Poured soy-wax candle with notes of smoked cedarwood, dark amber, and crushed pine needles. Burns cleanly for quiet evenings.",
    specifications: [
      { label: "Wax", value: "100% natural soy and coconut wax blend" },
      { label: "Wick", value: "Cracking wooden wick" },
      { label: "Burn Time", value: "50+ hours" }
    ],
    createdAt: "2026-03-20T00:00:00.000Z",
    featured: false,
    popular: true
  },
  {
    id: "p-020",
    name: "Amber Reed Diffuser",
    category: "fragrance",
    price: 42.00,
    originalPrice: 52.00,
    rating: 4.7,
    reviewCount: 115,
    images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"],
    description: "Subtle continuous fragrance diffuser housed in heavy amber apothecary glass with natural rattan reeds.",
    specifications: [
      { label: "Volume", value: "200 ml" },
      { label: "Duration", value: "3 to 4 months diffusion" },
      { label: "Notes", value: "Warm amber, cardamom, sandalwood" }
    ],
    createdAt: "2026-02-05T00:00:00.000Z",
    featured: true,
    popular: false
  },
  {
    id: "p-021",
    name: "Smoked Vanilla Candle",
    category: "fragrance",
    price: 36.00,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 89,
    images: ["https://images.unsplash.com/photo-1577974023883-053ed575c977?auto=format&fit=crop&w=800&q=80"],
    description: "Rich Madagascar vanilla bean paired with dark tobacco leaf and toasted oak. A comforting, decadent late-night scent.",
    specifications: [
      { label: "Vessel", value: "Matte ceramic tumbler" },
      { label: "Burn Time", value: "45 hours" }
    ],
    createdAt: "2026-04-22T00:00:00.000Z",
    featured: false,
    popular: true
  },
  {
    id: "p-022",
    name: "Night Bloom Room Spray",
    category: "fragrance",
    price: 22.00,
    originalPrice: null,
    rating: 4.4,
    reviewCount: 38,
    images: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"],
    description: "Instant botanical mist featuring nocturnal jasmine, vetiver, and white musk to refresh living spaces before sleep.",
    specifications: [
      { label: "Volume", value: "100 ml glass atomizer" },
      { label: "Formula", value: "Alcohol-free botanical blend" }
    ],
    createdAt: "2026-05-18T00:00:00.000Z",
    featured: false,
    popular: false
  },
  {
    id: "p-023",
    name: "Ceramic Incense Holder",
    category: "fragrance",
    price: 26.00,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 67,
    images: ["https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80"],
    description: "Hand-thrown speckled stoneware dish designed to catch ash cleanly while burning Japanese incense sticks.",
    specifications: [
      { label: "Material", value: "High-fired stoneware ceramic" },
      { label: "Diameter", value: "14 cm" }
    ],
    createdAt: "2026-06-01T00:00:00.000Z",
    featured: false,
    popular: false
  },
  {
    id: "p-024",
    name: "Ash and Sandalwood Discovery Set",
    category: "fragrance",
    price: 58.00,
    originalPrice: 72.00,
    rating: 4.9,
    reviewCount: 104,
    images: ["https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"],
    description: "Trio of travel-sized soy candles featuring earthy sandalwood, burnt fig, and smoky vetiver.",
    specifications: [
      { label: "Contents", value: "3 x 85g mini candles" },
      { label: "Packaging", value: "Rigid matte gift box" }
    ],
    createdAt: "2026-01-30T00:00:00.000Z",
    featured: false,
    popular: false
  },

  // SLEEP (6)
  {
    id: "p-025",
    name: "Lull Linen Pillowcase Set",
    category: "sleep",
    price: 68.00,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 131,
    images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"],
    description: "French flax linen pillowcases pre-washed for incredible softness. Breathable weave regulates temperature through the night.",
    specifications: [
      { label: "Material", value: "100% French flax linen" },
      { label: "Certifications", value: "OEKO-TEX Standard 100" },
      { label: "Closure", value: "Envelope closure design" }
    ],
    createdAt: "2026-03-10T00:00:00.000Z",
    featured: false,
    popular: false
  },
  {
    id: "p-026",
    name: "Weighted Calm Blanket",
    category: "sleep",
    price: 129.00,
    originalPrice: 159.00,
    rating: 4.9,
    reviewCount: 245,
    images: ["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80"],
    description: "Evenly distributed glass micro-beads encased in breathable cotton knit. Delivers deep tactile pressure for restorative sleep.",
    specifications: [
      { label: "Weight", value: "6.8 kg (15 lbs)" },
      { label: "Dimensions", value: "120cm x 180cm" },
      { label: "Cover", value: "Removable washable organic cotton" }
    ],
    createdAt: "2026-02-01T00:00:00.000Z",
    featured: false,
    popular: true
  },
  {
    id: "p-027",
    name: "Moonlit Silk Sleep Mask",
    category: "sleep",
    price: 32.00,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 189,
    images: ["https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80"],
    description: "Pure mulberry silk eye mask filled with silk floss for total blackout comfort without pressure on eyelids.",
    specifications: [
      { label: "Silk", value: "22 Momme pure mulberry silk" },
      { label: "Strap", value: "Encased silk elastic band" }
    ],
    createdAt: "2026-04-15T00:00:00.000Z",
    featured: false,
    popular: true
  },
  {
    id: "p-028",
    name: "Drift Sunrise Alarm Clock",
    category: "sleep",
    price: 79.00,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 140,
    images: ["https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80"],
    description: "Simulates a gentle natural sunrise with progressive colored light and soothing acoustic soundscapes to wake you softly.",
    specifications: [
      { label: "Display", value: "Auto-dimming LED matrix" },
      { label: "Sounds", value: "10 nature sound profiles" },
      { label: "Backup", value: "Coin cell battery backup" }
    ],
    createdAt: "2026-01-05T00:00:00.000Z",
    featured: true,
    popular: false
  },
  {
    id: "p-029",
    name: "Quiet Hours White Noise Machine",
    category: "sleep",
    price: 59.00,
    originalPrice: 74.00,
    rating: 4.6,
    reviewCount: 95,
    images: ["https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80"],
    description: "Compact acoustic sound conditioner featuring non-looping fan sounds and ocean rhythms to mask disruptive nighttime noises.",
    specifications: [
      { label: "Audio", value: "Real mechanical fan inside" },
      { label: "Controls", value: "Dual-speed tone shift ring" }
    ],
    createdAt: "2026-05-01T00:00:00.000Z",
    featured: false,
    popular: false
  },
  {
    id: "p-030",
    name: "Slumber Herbal Pillow Mist",
    category: "sleep",
    price: 19.00,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 81,
    images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"],
    description: "Calming sleep spray infused with organic lavender, vetiver, and chamomile essential oils to mist over bedding before rest.",
    specifications: [
      { label: "Volume", value: "75 ml amber spray bottle" },
      { label: "Safety", value: "Non-staining formula tested on fabrics" }
    ],
    createdAt: "2026-06-20T00:00:00.000Z",
    featured: false,
    popular: false
  }
];