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
    <div className="max-w-lg p-4 bg-base-100 shadow-xl mt-6 flex flex-col rounded">
      <div className="text-xl font-semibold">
        {imageData.race} {imageData.role}
      </div>
      <div className="divider mt-2"></div>
      <div className="bg-base-100 ">
        <Image src={url} width={512} height={512} alt={imageData.race + imageData.role} />
      </div>
      <div className="my-2">
        <div className="flex justify-evenly">
          {
            Object.entries(imageData).map(([key, value]) => {
              if (value === "") return
              if (key === "race" || key === "role" || key === "style") return (
                <div key={key} className="badge badge-primary inline-block mx-4">
                  {value}
                </div>
              )
            })
          }

        </div>
        <div className="divider my-2"></div>
        <div className="text-base-content">
          {imageData.story}
        </div>
        <div className="my-2 font-thin">
          created: {date.toUTCString()}
        </div>
      </div>
    </div >
  )
}  
