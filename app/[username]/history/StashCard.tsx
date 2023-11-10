import Image from "next/image";

export interface StashCardProps {
  imageData: {
    race: string,
    style: string,
    role: string,
    story: string,
  },
  imageDate: string,
  url: string
}

export default function StashCard({ imageDate, imageData, url }: StashCardProps) {
  const date = new Date(imageDate)

  return (
    <div className="max-w-lg p-6 bg-base-200 shadow-xl mt-6 flex flex-col rounded">
      <div className="text-xl font-semibold">
        {imageData.race} {imageData.role}
      </div>
      <div className="divider mt-2"></div>
      <div className="bg-base-100 ">
        <Image src={url} width={512} height={512} alt={imageData.race + imageData.role} />
      </div>
      <div className="my-2 bg-gray-600 rounded">
        <ul className="p-2">
          {
            Object.entries(imageData).map(([key, value]) => {
              if (value === "") return
              return (
                <li key={key} className="font-semibold">
                  {key}: {value}
                </li>
              )
            })
          }
          <li className="font-semibold">
            created: {date.toUTCString()}
          </li>
        </ul>
      </div>

    </div >
  )
}  
