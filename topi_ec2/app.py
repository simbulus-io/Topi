#!/usr/bin/env python3
import os
from topi_ec2.topi_ec2_stack import TopiEc2Stack
from aws_cdk import core as cdk

# For consistency with TypeScript code, `cdk` is the preferred import name for
# the CDK's core module.  The following line also imports it as `core` for use
# with examples from the CDK Developer's Guide, which are in the process of
# being updated to use `cdk`.  You may delete this import if you don't need it.
from aws_cdk import core

from topi_ec2.topi_ec2_stack import TopiEc2Stack


app = core.App()
env = core.Environment(account="525256556709",region="us-east-2")


TopiEc2Stack(app, "ec2-instance",env=env)
app.synth()
