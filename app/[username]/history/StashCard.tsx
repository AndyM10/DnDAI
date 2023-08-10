import { Database } from "@/lib/database";
import { object } from "zod";

interface StashCardProps {
  image: Database['public']['Tables']['images']['Row'],
  url: string
}


export default function StashCard({ image, url }: StashCardProps) {
  const date = new Date(image.created_at)
  const imageData = Object.values(image.image_data)
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
            imageData.map((data) => (
              <div className="text-xl font-semibold">
                : {data?.toString()}
              </div>
            ))}
        </div>
      </div>
    </div >
  )
}  
