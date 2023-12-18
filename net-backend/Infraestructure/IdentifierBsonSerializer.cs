using DDDSample1.Domain.Shared;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;

public class IdentifierBsonSerializer : SerializerBase<Identifier>
{
    public override Identifier Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
    {
        var bsonReader = context.Reader;
        var value = bsonReader.ReadString();
        return new Identifier(value);
    }

    public override void Serialize(BsonSerializationContext context, BsonSerializationArgs args, Identifier value)
    {
        var bsonWriter = context.Writer;
        bsonWriter.WriteString(value.AsString());
    }
}