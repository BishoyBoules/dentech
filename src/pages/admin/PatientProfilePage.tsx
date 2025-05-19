import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/axios';

interface PatientTreatment {
  id: number;
  age: number;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  date_of_birth: string;
  allergies: string;
  medical_history: string;
  current_medication: string;
  treatment_date: string;
  procedure: string;
  tooth: number;
  notes: string;
  cost: string;
  status: string;
  payment_status: string;
  payment_method: string;
  last_visit: string | null;
  next_visit: string | null;
  clinic: number;
  doctor: number;
}

const PatientProfilePage: React.FC = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<PatientTreatment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/accounts/patient-treatments`);
        setPatient(response.data.find((patient: PatientTreatment) => patient.id === Number(id)));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching patient details:', err);
        setError('Failed to load patient details');
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading patient details...</p>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error || 'Patient not found'}</p>
        <button
          onClick={() => navigate('/admin/patients')}
          className="mt-2 text-sm text-red-700 hover:text-red-900"
        >
          Go back
        </button>
      </div>
    );
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate('/admin/patients')}
          className="flex items-center text-sm text-indigo-600 hover:text-indigo-900"
        >
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Patients List
        </button>
      </div>

      {/* Patient Overview */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Patient ID: {patient.id} · DOB: {patient.date_of_birth}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(patient.status)}`}>
            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
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
                <dd className="inline">{patient.phone_number}</dd>
              </div>
              <div className="mt-1">
                <dt className="inline font-medium">Address: </dt>
                <dd className="inline">{patient.address}</dd>
              </div>
              <div className="mt-1">
                <dt className="inline font-medium">Age: </dt>
                <dd className="inline">{patient.age}</dd>
              </div>
            </dl>
          </div>

          {/* Appointments */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">Appointments</h3>
            <dl className="mt-2 text-sm text-gray-500">
              <div className="mt-1">
                <dt className="inline font-medium">Last Visit: </dt>
                <dd className="inline">{patient.last_visit || 'None'}</dd>
              </div>
              <div className="mt-1">
                <dt className="inline font-medium">Next Appointment: </dt>
                <dd className="inline">{patient.next_visit || 'Not scheduled'}</dd>
              </div>
              <div className="mt-1">
                <dt className="inline font-medium">Treatment Date: </dt>
                <dd className="inline">{patient.treatment_date}</dd>
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
            <p className="mt-2 text-sm text-gray-900">{patient.allergies || 'None'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Medical History</h4>
            <p className="mt-2 text-sm text-gray-900">{patient.medical_history || 'None'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Current Medications</h4>
            <p className="mt-2 text-sm text-gray-900">{patient.current_medication || 'None'}</p>
          </div>
        </div>
      </div>

      {/* Treatment Details */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Treatment Details</h2>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.treatment_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {patient.procedure}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.tooth}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {patient.notes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${patient.cost}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(patient.status)}`}>
                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${patient.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {patient.payment_status.charAt(0).toUpperCase() + patient.payment_status.slice(1)}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <h3 className="text-md font-medium text-gray-700">Clinic: {patient.clinic}</h3>
          <h3 className="text-md font-medium text-gray-700">Doctor: {patient.doctor}</h3>
          <h3 className="text-md font-medium text-gray-700">Payment Method: {patient.payment_method}</h3>
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;
