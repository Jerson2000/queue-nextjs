import { useState } from "react"

export default function Home() {

  const [queue, setQueue] = useState({
    number: '',
    isServing: false,
  })

  const [q, setQ] = useState([]);

  const qNum = (e) => {
    setQueue({ ...queue, number: e.target.value });

  }

  const addQ = () => {
    if (queue.number !== '') {
      setQ([...q, queue]);
      setQueue({ ...queue, number: '', isServing: false });
    }else{
      alert("Field cannot be empty!");
    }


  }

  const qServing = (index) => {
    let upQ = q.filter((data, i) => {
      if (index === i) {
        return (data.isServing = true)
      }
      else {
        return data;
      }
    })

    setQ(upQ);
  }

  const qRemove = (index) => {
    let upQ = q.filter((data, i) => {
      if (index !== i) {
        return data;
      }
    })

    setQ(upQ);
  }




  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">

        <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-1 gap-2 md:mx-auto md:w-full md:max-w-lg">
          <input
            name="email"
            type="text"
            className="col-span-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            value={queue.number}
            onChange={qNum}

          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addQ}
          >
            Add
          </button>

        </div>

        <div className="mt-2 grid grid-flow-row-dense grid-cols-2 grid-rows-1 md:mx-auto md:w-full md:max-w-lg text-center font-medium">

          <div className="bg-green-700 p-3 text-white">
            Now Serving...
          </div>

          <div className="bg-slate-900 p-3 text-white">
            Now Preparing...
          </div>

        </div>

        {/* QUEUE */}

        <div className="mt-3 grid grid-flow-row-dense grid-cols-2 gap-2 md:mx-auto md:w-full md:max-w-lg">
          {/* Now Serving */}
          <ul className="h-[550px] flex flex-col flex-wrap gap-4 font-bold text-2xl">

            {q.map((data, i) => {
              if (data.isServing === true) {
                return (<div key={i}>{`${data.number}`} <span className=" cursor-pointer" onClick={() => { qRemove(i) }}>✔</span></div>);
              }
            })}

          </ul>

          {/* Now Preparing */}

          <ul className="h-[550px] flex flex-col flex-wrap gap-4 font-bold text-2xl">

            {q.map((data, i) => {
              if (data.isServing === false) {
                return (<div key={i}>{`${data.number}`} <span className=" cursor-pointer" onClick={() => { qServing(i) }}>🤟</span></div>);
              }
            })}

          </ul>


        </div>

      </div>
    </>
  )
}
