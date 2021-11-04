from aws_cdk import(
 core as cdk,
 aws_ec2 as ec2,
)

# For consistency with other languages, `cdk` is the preferred import name for
# the CDK's core module.  The following line also imports it as `core` for use
# with examples from the CDK Developer's Guide, which are in the process of
# being updated to use `cdk`.  You may delete this import if you don't need it.

vpcID = "vpc-01cb12e35d9d59f47"
instanceName = "topi_server"
instanceType = "t2.micro"
amiName = "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-20211021-aced0818-eef1-427a-9e04-8ba38bada306"

class TopiEc2Stack(cdk.Stack):

    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        vpc = ec2.Vpc.from_lookup(
            self,
            "vpc",
            vpc_id=vpcID,
            subnet_group_name_tag="Public Subnet"
        )

        sec_group = ec2.SecurityGroup(
            self,
            "sec-group-allow-ssh",
            vpc=vpc,
            allow_all_outbound=True,
        )

        sec_group.add_ingress_rule(
            peer=ec2.Peer.ipv4('10.0.0.0/16'),
            description="Allow SSH connection", 
            connection=ec2.Port.tcp(22)
        )

        ec2_instance = ec2.Instance(
            self,
            "ec2-instance",
            instance_name=instanceName,
            instance_type=ec2.InstanceType(instanceType),
            machine_image=ec2.MachineImage().lookup(name=amiName),
            vpc=vpc,
            security_group=sec_group,
        )
