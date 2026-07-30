export type Category = "AI Influencer" | "Animation" | "TVC" | "Product"

export type Work = {
  src: string
  poster: string
  title: string
  note: string
  category: Category
  portrait?: boolean
}

export const WORKS: Work[] = [
  // Temporarily hidden (vertical AI influencer clip). Restore by uncommenting
  // this entry and adding "AI Influencer" back to WORK_CATEGORIES below.
  // {
  //   src: "/media/work-olivia.mp4",
  //   poster: "/media/work-olivia.jpg",
  //   title: "Olivia",
  //   note: "AI host, finance social series",
  //   category: "AI Influencer",
  //   portrait: true,
  // },
  {
    src: "/media/work-wukong.mp4",
    poster: "/media/work-wukong.jpg",
    title: "Market Monkey",
    note: "AI mascot market commentary",
    category: "Animation",
  },
  {
    src: "/media/work-dawn-1.mp4",
    poster: "/media/work-dawn-1.jpg",
    title: "The First Dawn",
    note: "Animated short, the tempest",
    category: "Animation",
  },
  {
    src: "/media/work-dawn-4.mp4",
    poster: "/media/work-dawn-4.jpg",
    title: "The First Dawn",
    note: "Animated short, first spark",
    category: "Animation",
  },
  {
    src: "/media/work-dawn-3.mp4",
    poster: "/media/work-dawn-3.jpg",
    title: "The First Dawn",
    note: "Animated short, the elder",
    category: "Animation",
  },
  {
    src: "/media/work-dawn-5.mp4",
    poster: "/media/work-dawn-5.jpg",
    title: "The First Dawn",
    note: "Animated short, blood moon",
    category: "Animation",
  },
  {
    src: "/media/work-dawn-2.mp4",
    poster: "/media/work-dawn-2.jpg",
    title: "The First Dawn",
    note: "Animated short, the village",
    category: "Animation",
  },
]

// Categories that currently have real work. Add "AI Influencer" back when the
// Olivia clip is restored; add "TVC" / "Product" once those Drive folders are
// unlocked and their clips are added above.
export const WORK_CATEGORIES: ("All" | Category)[] = ["All", "Animation"]
