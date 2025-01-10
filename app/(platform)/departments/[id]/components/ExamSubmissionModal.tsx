import { Upload } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ExamSubmissionModalProps {
  showModal: boolean
  setShowModal: (show: boolean) => void
}

export function ExamSubmissionModal({ showModal, setShowModal }: ExamSubmissionModalProps) {
  const subjects = [
    { id: 1, name: "Data Structures" },
    { id: 2, name: "Database Management" },
    { id: 3, name: "Machine Learning" },
  ]

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Submit New Examination</DialogTitle>
          <DialogDescription>
            Upload exam details and related documents
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Subject
              </label>
              <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Exam Type
              </label>
              <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>CAT-1</option>
                <option>CAT-2</option>
                <option>Final Exam</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Upload Exam Paper
            </label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supported formats: PDF, DOC, DOCX (Max size: 10MB)
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Additional Notes
            </label>
            <textarea
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Any special instructions or requirements..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Submit Exam
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

