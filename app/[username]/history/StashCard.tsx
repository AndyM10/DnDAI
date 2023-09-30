import { Database, Json } from "@/lib/database";
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
    <div className="card w-full p-6 bg-base-200 shadow-xl mt-6">
      <div className="text-xl font-semibold">
        {date.toUTCString()}
      </div>
      <div className="divider mt-2"></div>
      <div className="flex flex-col h-full w-full bg-base-100 ">
        <Image src={url} width={512} height={512} alt={imageData.race + imageData.role} />
        <div className="card-body">
          <ul>
            {
              Object.entries(imageData).map(([key, value]) => {
                if (value === "") return
                return (
                  <li key={key} className="list-disc font-semibold">
                    {value}
                  </li>
                )
              })
            }

          </ul>
        </div>
      </div>
    </div >
  )
}  
