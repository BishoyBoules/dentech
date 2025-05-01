import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { mockPatients, Treatment } from '../../data/mockPatients';

const PatientProfilePage: React.FC = () => {
  const { id } = useParams();
  const patient = mockPatients.find(p => p.id === Number(id));

  if (!patient) {
    return <Navigate to="/admin/patients" replace />;
  }

  const getStatusBadgeClass = (status: Treatment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Patient Overview */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Patient ID: {patient.id} · DOB: {patient.dateOfBirth.toLocaleDateString()}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${patient.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
            {patient.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Contact Information */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
            <dl className="mt-2 text-sm text-gray-500">
              <div className="mt-1">
                <dt className="inline font-medium">Email: </dt>
                <dd className="inline">{patient.email}</dd>
              </div>
              <div className="mt-1">
                <dt className="inline font-medium">Phone: </dt>
                <dd className="inline">{patient.phone}</dd>
              </div>
              <div className="mt-1">
                <dt className="inline font-medium">Address: </dt>
                <dd className="inline">{patient.address}</dd>
              </div>
            </dl>
          </div>

          {/* Appointments */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">Appointments</h3>
            <dl className="mt-2 text-sm text-gray-500">
              <div className="mt-1">
                <dt className="inline font-medium">Last Visit: </dt>
                <dd className="inline">{patient.lastVisit.toLocaleDateString()}</dd>
              </div>
              <div className="mt-1">
                <dt className="inline font-medium">Next Appointment: </dt>
                <dd className="inline">
                  {patient.nextAppointment ? patient.nextAppointment.toLocaleDateString() : 'Not scheduled'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Medical History */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Medical History</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Allergies</h4>
            <ul className="mt-2 space-y-1">
              {patient.medicalHistory.allergies.map((allergy, index) => (
                <li key={index} className="text-sm text-gray-900">{allergy}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Medical Conditions</h4>
            <ul className="mt-2 space-y-1">
              {patient.medicalHistory.conditions.map((condition, index) => (
                <li key={index} className="text-sm text-gray-900">{condition}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Current Medications</h4>
            <ul className="mt-2 space-y-1">
              {patient.medicalHistory.medications.map((medication, index) => (
                <li key={index} className="text-sm text-gray-900">{medication}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Treatment History */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Treatment History</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Procedure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tooth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patient.treatments.map((treatment) => (
                <tr key={treatment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {treatment.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {treatment.procedure}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {treatment.tooth}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {treatment.notes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${treatment.cost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(treatment.status)}`}>
                      {treatment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;
