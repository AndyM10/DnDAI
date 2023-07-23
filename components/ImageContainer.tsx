import { GenerationForm } from "@/app/[username]/page";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ImagesResponseDataInner } from "openai";

interface ImageContainerProps {
  image: ImagesResponseDataInner[];
  close: () => void;
  supabase: SupabaseClient;
  formData: GenerationForm
}


export default async function ImageContainer({ image, close, supabase, formData }: ImageContainerProps) {

  const user = await supabase.auth.getUser()
  const saveImage = async () => {
    try {
      const { data, error } = await supabase.from('images').insert([{
        image_url: image[0].url,
        username: user.data.user?.user_metadata.username,
        image_data: {
          formData
        }
      }])

      if (error) throw Error(error.message)

      console.log(data)

      close()

    } catch (error) {
      throw error
    }
  }
  return (
    <div className="card w-96 bg-base-300 shadow-xl mt-4">
      <div className="card-actions justify-end">
        <button className="btn btn-square btn-sm m-3" onClick={close}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <figure className="px-10 pt-10">
          {image.map((image, index) => (
            <img className="rounded-lg" key={`image-${index}`} src={image.url} width={512} height={512} alt={`Image ${index}`} />
          ))}
        </figure>
        <div className="card-body items-center text-center">
          <button className="btn btn-primary" onClick={saveImage}>Save</button>
        </div>
      </div>
    </div>
  )
}
