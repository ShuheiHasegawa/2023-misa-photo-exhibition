const IMAGE_PATH = '/images/'
const IMAGE_EXTENSION = '.png'

export const createPublicImagePath = (fileName: string) => {
  return `${IMAGE_PATH}${fileName}${IMAGE_EXTENSION}`
}

type IMAGE_ITEM = {
  id: number,
  portrait: boolean
}

export const IMAGE_LIST:IMAGE_ITEM[] = [
  {
    id: 1,
    portrait: true,
  },
  {
    id: 2,
    portrait: true,
  },
  {
    id: 3,
    portrait: true,
  },
  {
    id: 4,
    portrait: true,
  },
  {
    id: 5,
    portrait: true,
  },
  {
    id: 6,
    portrait: true,
  },
  {
    id: 7,
    portrait: true,
  },
  {
    id: 8,
    portrait: true,
  },
  {
    id: 9,
    portrait: true,
  },
  {
    id: 10,
    portrait: true,
  },
  {
    id: 11,
    portrait: false,
  },
  {
    id: 12,
    portrait: false,
  },
  {
    id: 13,
    portrait: false,
  },
]
