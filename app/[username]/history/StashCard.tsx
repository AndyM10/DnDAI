import { Database, Json } from "@/lib/database";

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
        <img src={url} className="w-full h-full" />
        <div className="card-body">
          {
            //loop over imageData and create a div for each key value pair
            Object.entries(imageData).map(([key, value]) => (
              <div key={key} className="text-xl font-semibold">
                {value}
              </div>
            ))
          }
        </div>
      </div>
    </div >
  )
}  
