// interface HomeProps {
//   count: number;
// }

import Image from "next/image"
import appPreviewImg from "../assets/app-preview.png"
import logoImg from "../assets/logo.svg"
import userAvatarExampleImg from "../assets/users-avatar-examples.png"
import iconCheckImage from "../assets/check-icon.svg"

export default function Home() {
  return (
    <div className="max-w-[1124px] mx-auto grid grid-cols-2 items-center h-screen">
      <main>
        <Image src={logoImg} alt="logo nlw-copa"></Image>
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
        <div className="mt-10 flex items-center gap-2">
          <Image src={userAvatarExampleImg} alt=""></Image>
          <strong className="text-gray-100 text-xl"><span className="text-ignite-500">+12.592 pessoas</span> já estão usando</strong>
        </div>
        <form className="mt-10 flex gap-2" action="">
          <input className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm" type="text" placeholder="Qual nome do seu bolão?" name="" id="" required/>
          <button className="bg-yellow-500 px-6 py-4 rounded font-bold text-gray-900 text-small uppercase" type="submit">Criar meu bolão</button>
        </form>
        <p>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>
        <div>
          <div>
            <Image src={iconCheckImage} alt="iconcheck"></Image>
            <div>
              <span>+2.034</span>
              <span>Bolöes criados</span>
            </div>
          </div>
          <div>
            <Image src={iconCheckImage} alt="iconcheck"></Image>
            <span>+192.847</span>
            <span>Palpites enviados</span>
          </div>
        </div>
      </main>

      <Image src={appPreviewImg} alt="Prévia da aplicação móvel" quality={100}/>
    </div>
  )
}

// export const getServerSideProps = async () => {
//   const response = await fetch("http://localhost:3333/pools/count")
//   const data = await response.json()
//   return{
//     props:{
//       count: data.count,
//     }
//   }
// }
