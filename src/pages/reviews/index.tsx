import { useState } from "react";
import { api } from "~/utils/api";
import type { ReviewUpdateInput, ReviewInput } from "~/validations/review";

export default function Page() {
  const reviewData = api.review.getAll.useQuery()
  const [editing, setEditing] = useState(false)

  const DEFAULT_FORM_STATE: ReviewInput = {
    name: "",
    rating: 0,
  }

  type ReviewInputFormState = ReviewInput & { id?: number }

  const [formState, setFormState] = useState<ReviewInputFormState>(DEFAULT_FORM_STATE)

  const utils = api.useContext()

  const { mutate: createReview } = api.review.create.useMutation({
    onSuccess: async () => {
      setEditing(false)
      setFormState(DEFAULT_FORM_STATE)

      await utils.review.getAll.invalidate()
    }
  })

  const { mutate: updateReview } = api.review.update.useMutation({
    onSuccess: async () => {
      setEditing(false)
      setFormState(DEFAULT_FORM_STATE)

      await utils.review.getAll.invalidate()
    }
  })

  const { mutate: deleteReview } = api.review.delete.useMutation({
    onSuccess: async () => {
      await utils.review.getAll.invalidate()
    }
  })

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (formState.id != undefined) {
      updateReview(formState as ReviewUpdateInput)
    } else {
      createReview(formState)
    }
  }

  return (
    <main className="mx-auto contianer max-w-5xl p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">Reviews</h1>

        <button onClick={() => setEditing(!editing)} className="p-4 rounded shadow bg-green-500">
          {editing ? "Cancel" : "New Review"}
        </button>
      </div>

      {editing ? (
        <form className="flex flex-col gap-4" onSubmit={submitForm}>
          <div>
            <label>
              <span>Name</span>

              <input
                type="text"
                placeholder="Location name..."
                value={formState.name}
                onChange={e => setFormState({ ...formState, name: e.target.value })}
                className="p-2 rounded shadow bg-slate-900 text-white w-full"
              />
            </label>
          </div>

          <div>
            <label>
              <span>Rating</span>

              <input
                type="number"
                placeholder="Rating..."
                value={formState.rating}
                min={0}
                max={10}
                onChange={e => setFormState({ ...formState, rating: parseInt(e.target.value) })}
                className="p-2 rounded shadow bg-slate-900 text-white w-full"
              />
            </label>
          </div>

          <div>
            <button type="submit" className="p-4 rounded shadow bg-green-500 w-full">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Rating</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {reviewData.data?.map(review => (
                <tr key={review.id}>
                  <td>{review.name}</td>
                  <td>{review.rating}</td>
                  <td>
                    <button
                    onClick={() => {
                      setFormState(review)
                      setEditing(true)
                    }}
                    className="p-2 rounded shadow bg-green-500">
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteReview({ id: review.id })} className="p-2 rounded shadow bg-red-500">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </main>
  )
}
