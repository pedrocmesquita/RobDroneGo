using DDDSample1.Domain.SurveillanceTasks;

namespace DDDSample1.Mappers
{
    public class SurveillanceTaskMapper
    {
        public static SurveillanceTaskDto domainToDTO(SurveillanceTask st)
        {
            return new SurveillanceTaskDto
            {   
                ClientEmail = st.ClientEmail,
                Id = st.Id.AsGuid(),
                SurveillanceTaskId = st.SurveillanceTaskId.SurveillanceTaskIdentifier,
                ContactNumber = st.ContactNumber, Building = st.Building, Floors = st.Floors,
                Active = st.Active, CreatedAt = st.CreatedAt, UpdatedAt = st.UpdatedAt
            };
        }
    }
}