import { GenerationForm } from "@/app/[username]/generate/page";
import { Image } from "openai/resources";

interface ImageContainerProps {
  formData: GenerationForm;
  image: Image[];
  close: () => void;
}

export default function ImageContainer({ image, close, formData }: ImageContainerProps) {

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/save`

  const saveImage = async () => {
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: image[0].url,
          formData
        })
      })

      close()

    } catch (error) {
      throw error
    }
  }
  return (
    <div className="card w-96 bg-base-300 shadow-xl mt-4">
      <div className="flex flex-col">
        <button className="btn btn-square btn-sm m-3" onClick={close}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <figure className="px-10">
          {image.map((image, index) => (
            <img className="rounded-lg" key={`image-${index}`} src={image.url} width={512} height={512} alt={`Image ${index}`} />
          ))}
        </figure>
        <div className="items-center text-center my-2">
          <p className="my-2">Save this image or loose it forever!</p>
          <button className="btn btn-primary" onClick={saveImage}>Save</button>
        </div>
      </div>
    </div>
  )
}
