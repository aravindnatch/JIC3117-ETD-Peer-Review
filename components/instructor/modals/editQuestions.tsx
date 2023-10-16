import { useState } from "react";
import { createPortal } from "react-dom";
import axios from 'axios'
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";

interface ModalProps {
  editQuestions: any;
  setEditQuestions: any;
}

function closeModal(e: any, setEditQuestions: any) {
  if (e.target == e.currentTarget){
    e.stopPropagation()
    setEditQuestions(false);
  }
}

export default function EditQuestions({ editQuestions, setEditQuestions }: ModalProps) {
  const [cookies] = useCookies(['userData']);
  const [name, setName] = useState(editQuestions.name);
  const [pressed, setPressed] = useState(false);
  const [questions, setQuestions] = useState<string[]>(editQuestions.questions);
  const [newQuestion, setNewQuestion] = useState('');

  function handleAddQuestion() {
    setQuestions(prev => [...prev, newQuestion]);
    setNewQuestion('');
  }

  function handleRemoveQuestion(index: number) {
    setQuestions(prev => prev.filter((_, i) => i !== index));
  }

  function handleAdd() {
    setPressed(true);
    axios.defaults.headers.common['Authorization'] = cookies.userData.token
    axios.post("/api/question/add", {
      'docID': editQuestions._id,
      'name': name,
      'questions': questions
    }).then((res) => {
      window.location.reload()
    }).catch((err) => {
      setPressed(false);
      toast.error(err.response?.data || "internal server error")
    })
  }
  
  return createPortal (
    <div onClick={(event) => closeModal(event, setEditQuestions)} className="fixed z-10 flex justify-center items-center p-4 inset-0 h-full bg-[rgba(0,0,0,0.3)] h-modal overflow-x-hidden overflow-y-auto">
      <div className="fixed w-full max-w-md h-auto">
        <div className="relative bg-white rounded-lg">
          <div onClick={() => setEditQuestions(false)} className="cursor-pointer absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center ">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </div>

          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-6 text-xl font-medium text-gray-900">Edit Question Set</h3>
            <div className="space-y-6">
            <div>
              <div className="block mb-3 text-sm font-medium text-gray-900">
                Set Name
              </div>
              <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Set Name" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>

            <div className="space-y-4 mt-4">
              <div className="block mb-3 text-sm font-medium text-gray-900">
                Questions
              </div>
              {questions.map((question, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="text-sm text-gray-700">{question}</div>
                  <button onClick={() => handleRemoveQuestion(index)} className="text-red-500 text-sm">Remove</button>
                </div>
              ))}
              
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <input 
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Add a new question" 
                  className="flex-grow text-gray-900 text-sm rounded-lg border-none focus:ring-0 block w-full p-2.5" 
                  required 
                />

                <button onClick={handleAddQuestion} disabled={newQuestion === ''} className="bg-transparent flex items-center justify-center w-10">
                  <BiPlus className="text-2xl opacity-70" />
                </button>
              </div>
            </div>

            <button onClick={handleAdd} disabled={name == "" || questions.length === 0} className={`w-full text-white bg-amber-600 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-40`}>
              {pressed ? 'Editing Question Set...' : 'Edit Question Set'}
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  , document.body);
}
