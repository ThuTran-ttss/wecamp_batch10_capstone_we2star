import { Calendar, CheckCircle, Clock, CalendarDays } from "lucide-react"

function ItineraryStats({ stats }) {
  return (
    <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Calendar className="h-6 w-6" />
        </div>

        <div>
          <strong className="text-3xl font-bold text-slate-900">
            {stats.totalActivities}
          </strong>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Total Activities
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
          <CheckCircle className="h-6 w-6" />
        </div>

        <div>
          <strong className="text-3xl font-bold text-slate-900">
            {stats.completedActivities}
          </strong>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Completed
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
          <Clock className="h-6 w-6" />
        </div>

        <div>
          <strong className="text-3xl font-bold text-slate-900">
            {stats.overdueActivities}
          </strong>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Overdue
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
          <CalendarDays className="h-6 w-6" />
        </div>

        <div>
          <strong className="text-3xl font-bold text-slate-900">
            {stats.totalDays}
          </strong>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Days
          </p>
        </div>
      </div>
    </section>
  )
}

export default ItineraryStats