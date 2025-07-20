export default function Home() {
  return (
    <div>
      <div className="mx-auto w-4/5 mt-10">
        <div className="items-end w-2/5 border-b-2 border-b-lilac-light rounded-md flex gap-1 py-1">
          <p className="text-xl">&#128269;</p>
          <input 
            className="w-full border-0 outline-0 text-lg"
            placeholder="Search room"
          />
        </div>
        <div className="overflow-auto max-h-[600px]">
          <table className="w-full mt-5 max-h-3/5 overflow-auto">
            <thead className="sticky top-0 bg-white z-10">
              <tr>
                <th className="w-3/5 text-left px-4 py-2">Name</th>
                <th className="w-1/5 text-left px-4 py-2">Created By</th>
                <th className="w-1/5 text-left px-4 py-2">Last Updated</th>
                <th className="w-1/5 text-left px-4 py-2">Members</th>
              </tr>
            </thead>
            <tbody>
              <tr className="cursor-pointer hover:bg-lilac-light/60 rounded-lg">
                <td className="w-3/5 px-4 py-2 break-words">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, enim fuga! Saepe accusantium, deserunt nulla...
                </td>
                <td className="w-1/5 px-4 py-2">Created By</td>
                <td className="w-1/5 px-4 py-2">Last Updated</td>
                <td className="w-1/5 px-4 py-2">Members</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="w-full h-screen flex justify-center items-center gap-4">
        <p className="text-5xl">🧐</p>
        <p className="text-2xl">No existig rooms</p>
      </div> */}
    </div>
  )
}
