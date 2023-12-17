using DDDSample1.Domain.SurveillanceTasks;

namespace DDDSample1.Mappers
{
    public class SurveillanceTaskMapper
    {
        public static SurveillanceTaskDto domainToDTO(SurveillanceTask st)
        {
            return new SurveillanceTaskDto
            {
                Id = st.Id.AsGuid(),
                SurveillanceTaskId = st.SurveillanceTaskId.SurveillanceTaskIdentifier,
                ContactNumber = st.ContactNumber, Building = st.Building, Floors = st.Floors
            };
        }
    }
}