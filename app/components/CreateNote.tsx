const CreateNote = () => {

  return (
    <section className="bg-blue-400 p-8 gap-5 w-3/5 h-screen flex flex-col">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Subject"
          className="w-full outline-none p-3 border-none "
        />
        <hr className="bg-gray-500" />
      </div>
      <textarea className="outline-none scroll-m-3.5" name="" id="" cols={40} />
    </section>
  );
};

export default CreateNote;
